<?php namespace App\Controllers;

use App\Models\OwnershipModel;

class Report extends Statistic
{
    private $userId;

    public function __construct()
    {
        parent::__construct();

        helper('sisauang');
        $token = request()->getGet('user');
        $user = null;
        if (!valid_access($token)['valid']) {
            return view('errors/invalid_access');
        } else {
            $user = valid_access($token)['user'];
            $this->userId = $user->id;

            $this->model->overrideDefaultFilter([
                $this->model->transaksi . '.deleted' => 0,
                $this->model->sumberDana . '.user_id' => $this->userId
            ]);

            $this->model->fundModel->overrideDefaultFilter([
                $this->model->sumberDana . '.deleted' => 0, 
                $this->model->sumberDana . '.user_id' => $this->userId
            ]);
        }
    }

    public function accountBalanceReportByOwner($dateRange)
    {
        if (! valid_subcscription($this->userId)) {
            return view('errors/invalid_subscription');
        }

        $pdf = new \PDFCreator();
        $title = 'Laporan Saldo dan Neraca';
        $printDate = $this->request->getGet('print_date') ?? date('Y-m-d');
        $signFormat = $this->request->getGet('sign_format');

        $ownershipModel = new OwnershipModel();
        $ownershipModel->overrideDefaultFilter(['deleted' => 0, 'user_id' => $this->userId]);
        $owners = $ownershipModel->getData(999, 0);
        $ownerBalances = [];
        $mutations = [];
        $startBalance = [];

        $startDate = '';
        $endDate = '';
        if (strpos($dateRange, '_') !== false) {
            $date = explode('_', $dateRange);
            $startDate = $date[0];
            $endDate = $date[1];
        } else {
            $startDate = $dateRange;
            $endDate = $dateRange;
        }

        try {
            foreach($owners as $owner) {
                $totalFunds = $ownershipModel->getTotalFund($owner->id);
                $totalBalance = 0;
                if($totalFunds) {
                    foreach($totalFunds as $fund) {
                        $totalBalance += (int)$fund->jumlah_dana;
                    }
                }

                $startBalance[] = [
                    'owner'     => $owner->kepemilikan,
                    'balance'   => $this->model->getTotalBalance($dateRange, $owner->id)['start_balance_raw']
                ];
    
                $fundSources = $ownershipModel->getFundsByOwner($owner->id);
                $ownerBalances[] = [
                    'id'        => $owner->id,
                    'owner'     => $owner->kepemilikan,
                    'balance'   => $totalBalance,
                    'balance_f' => plain_number_format($totalBalance),
                    'details'   => $fundSources
                ];
    
                // get mutations
                $fundMutations = [];
                foreach($fundSources as $fund) {
                    $totalIncomeExpense = $this->_getTotalIncomeExpense($dateRange, $owner->id, $fund->id_sumber_dana);
                    $fundMutations[] = [
                        'id'            => $fund->id_sumber_dana,
                        'name'          => $fund->nama_sumber_dana,
                        'income'        => $totalIncomeExpense['income_raw'],
                        'expense'       => $totalIncomeExpense['expense_raw'],
                    ];
                }
    
                $mutations[] = [
                    'ownerId'       => $owner->id,
                    'ownerName'     => $owner->kepemilikan,
                    'funds'         => $fundMutations
                ];
            }

            $totalAllBalance = plain_number_format(array_sum(array_column($ownerBalances, 'balance')));
            $totalStartBalance = plain_number_format(array_sum(array_column($startBalance, 'balance')));

            $mutationsIn = [];
            $mutationsOut = [];
            $totalMutationsIn = [];
            $totalMutationsOut = [];

            foreach ($mutations as $mutation) {
                $owner = $mutation['ownerName'];

                foreach ($mutation['funds'] as $fund) {
                    $income = (int)$fund['income'];
                    $expense = (int)$fund['expense'];

                    // Pemasukan
                    if ($income > 0) {
                        $mutationsIn[$owner][] = [
                            'name' => $fund['name'],
                            'amount' => plain_number_format($income)
                        ];
                        $totalMutationsIn[$owner] = ($totalMutationsIn[$owner] ?? 0) + $income;
                    }

                    // Pengeluaran
                    if ($expense > 0) {
                        $mutationsOut[$owner][] = [
                            'name' => $fund['name'],
                            'amount' => plain_number_format($expense)
                        ];
                        $totalMutationsOut[$owner] = ($totalMutationsOut[$owner] ?? 0) + $expense;
                    }
                }
            }

            $contentData = [
                'title'                 => $title,
                'dateRange'             => $dateRange,
                'balance'               => $ownerBalances,
                'startBalance'          => $startBalance,
                'totalStartBalance'     => $totalStartBalance,
                'totalAllBalance'       => $totalAllBalance,
                'mutationsIn'           => $mutationsIn,
                'mutationsOut'          => $mutationsOut,
                'totalMutationsIn'      => $totalMutationsIn,
                'sumMutationsIn'        => plain_number_format(array_sum($totalMutationsIn)),
                'sumMutationsOut'       => plain_number_format(array_sum($totalMutationsOut)),
                'totalMutationsOut'     => $totalMutationsOut,
                'period'                => os_date()->create($startDate, 'd-MM-y') . ' sd. ' . os_date()->create($endDate, 'd-MM-y'),
                'signs'                 => $this->getSigns($this->userId, ['date' => $printDate], $signFormat),
                'signFormat'            => $signFormat,

            ];

            $data = [
                'pageTitle' => $title,
                'content'   => view('report/neraca_saldo', $contentData),
            ];

            $html = view('layout/main', $data);
            $pdf->loadHTML($html)->render()->stream('Laporan-Neraca-dan-Saldo.pdf');

            // return $this->response->setJSON($contentData);
        } catch (\Exception $e) {
            return view('errors/invalid_access', ['message' => 'Terjadi kesalahan pada sistem. <br/> Pesan error: ' . $e->getMessage()]);
        }
    }

    public function generalCashReport($dateRange, $ownerId = 'all')
    {
        if (! valid_subcscription($this->userId)) {
            return view('errors/invalid_subscription');
        }

        $pdf = new \PDFCreator(['orientation' => 'landscape']);
        $title = 'Laporan Kas Umum';
        $printDate = $this->request->getGet('print_date') ?? date('Y-m-d');
        $signFormat = $this->request->getGet('sign_format');

        try {
            $balance = $this->model->getTotalBalance($dateRange, $ownerId);

            // Row format:
            // [No, Tanggal, Uraian, Pemasukan, Pengeluaran, Saldo]
            $index = 1;
            $rows = [];

            $currentBalance = str_replace(['Rp. ', '.', '-'], '', $balance['start_balance']);
            $currentBalance = (int)$currentBalance;
            $startDate = '';
            $endDate = '';
            if (strpos($dateRange, '_') !== false) {
                $date = explode('_', $dateRange);
                $startDate = $date[0];
                $endDate = $date[1];
            } else {
                $startDate = $dateRange;
                $endDate = $dateRange;
            }

            $rows[] = [
                'no' => $index++,
                'tanggal' => $startDate,
                'uraian' => 'Saldo Awal',
                'pemasukan' => plain_number_format($currentBalance),
                'pengeluaran' => '',
                'saldo' => plain_number_format($currentBalance),
            ];

            if ($ownerId !== 'all') {
                $this->model->setOwner($ownerId);
            }

            $transactions = $this->model->getData('all', 'all', 'all', 'all', $dateRange, 9999);

            usort($transactions, function ($a, $b) {
                return strtotime($a->tgl_transaksi) - strtotime($b->tgl_transaksi);
            });

            foreach ($transactions as $transaction) {
                $currentBalance = $transaction->jenis_transaksi === 'expense' ? $currentBalance - $transaction->nominal : $currentBalance + $transaction->nominal;
                $rows[] = [
                    'no' => $index++,
                    'tanggal' => $transaction->tgl_transaksi,
                    'uraian' => $transaction->deskripsi,
                    'pemasukan' => $transaction->jenis_transaksi === 'income' ? plain_number_format($transaction->nominal) : '',
                    'pengeluaran' => $transaction->jenis_transaksi === 'expense' ? plain_number_format($transaction->nominal) : '',
                    'saldo' => plain_number_format($currentBalance),
                ];
            }

            $totalIncomeExpense = $this->_getTotalIncomeExpense($dateRange, $ownerId);

            $contentData = [
                'title'                 => $title,
                'dateRange'             => $dateRange,
                'ownerId'               => $ownerId,
                'balance'               => $balance,
                'rows'                  => $rows,
                'totalIncomeExpense'    => $totalIncomeExpense,
                'period'                => os_date()->create($startDate, 'd-MM-y') . ' sd. ' . os_date()->create($endDate, 'd-MM-y'),
                'signs'                 => $this->getSigns($this->userId, ['date' => $printDate], $signFormat),
                'signFormat'            => $signFormat,
            ];

            $data = [
                'pageTitle' => $title,
                'content'   => view('report/kas_umum', $contentData),
            ];

            $html = view('layout/main', $data);
            $pdf->loadHTML($html)->render()->stream('Laporan-Kas-Umum.pdf');
            // return $html;
        } catch (\Exception $e) {
            return view('errors/invalid_access', ['message' => 'Terjadi kesalahan pada sistem. <br/> Pesan error: ' . $e->getMessage()]);
        }
    }

    /**
     * Get signers data for report
     * @param int $userId User ID
     * @param array $options Options for getting signers data
     * @param string $format Available format: 1, 2, 1_2, 1_3, 3_1_2, 2_1_3
     * @return array Signers data
     */
    private function getSigns($userId, array $options = [], $format)
    {
        $model = new \App\Models\SignModel();
        $signer1 = $model->getSignerByLevel(1, $userId);
        $signer2 = $model->getSignerByLevel(2, $userId);
        $signer3 = $model->getSignerByLevel(3, $userId);

        $rightTitle = $this->model->getReportLocation($userId) . ', ' . os_date()->create($options['date'], 'd-MM-y');
        $leftTitle = 'Mengetahui,';
        $signContent = [];
        $defaultContent = [
            [
                'title'     => $rightTitle,
                'name'      => $signer1->name,
                'position'  => $signer1->position
            ]
        ];

        if($format === '1') {
            $signContent = $defaultContent;
        } elseif($format === '2') {
            $signContent = [
                [
                    'title'     => $rightTitle,
                    'name'      => $signer2->name,
                    'position'  => $signer2->position
                ]
            ];
        } elseif($format === '1_2') {
            $signContent = [
                [
                    'title'     => $leftTitle,
                    'name'      => $signer1->name,
                    'position'  => $signer1->position
                ],
                [
                    'title'     => $rightTitle,
                    'name'      => $signer2->name,
                    'position'  => $signer2->position
                ]
            ];
        } elseif($format === '1_3') {
            $signContent = [
                [
                    'title'     => $leftTitle,
                    'name'      => $signer1->name,
                    'position'  => $signer1->position
                ],
                [
                    'title'     => $rightTitle,
                    'name'      => $signer3->name,
                    'position'  => $signer3->position
                ]
            ];
        } elseif($format === '3_1_2') {
            $signContent = [
                [
                    'title'     => '',
                    'name'      => $signer3->name,
                    'position'  => $signer3->position
                ],
                [
                    'title'     => $leftTitle,
                    'name'      => $signer1->name,
                    'position'  => $signer1->position
                ],
                [
                    'title'     => $rightTitle,
                    'name'      => $signer2->name,
                    'position'  => $signer2->position
                ]
            ];
        } elseif($format === '2_1_3') {
            $signContent = [
                [
                    'title'     => '',
                    'name'      => $signer2->name,
                    'position'  => $signer2->position
                ],
                [
                    'title'     => $leftTitle,
                    'name'      => $signer1->name,
                    'position'  => $signer1->position
                ],
                [
                    'title'     => $rightTitle,
                    'name'      => $signer3->name,
                    'position'  => $signer3->position
                ]
            ];
        } else {
            $signContent = $defaultContent;
        }

        return $signContent;
    }
}