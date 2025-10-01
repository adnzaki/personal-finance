<?php namespace App\Controllers;

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
            return view('invalid_access');
        } else {
            $user = valid_access($token)['user'];
            $this->userId = $user->id;
        }
    }

    public function generalCashReport($dateRange, $ownerId = 'all')
    {
        if (! valid_subcscription($this->userId)) {
            return view('invalid_subscription');
        }

        $this->model->overrideDefaultFilter([
            $this->model->transaksi . '.deleted' => 0, $this->model->sumberDana . '.user_id' => $this->userId
        ]);

        $pdf = new \PDFCreator(['orientation' => 'landscape']);
        $title = 'Laporan Kas Umum';
        $printDate = $this->request->getGet('print_date') ?? date('Y-m-d');
        $signFormat = $this->request->getGet('sign_format');

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

        if($ownerId !== 'all') {
            $this->model->setOwner($ownerId);
        }

        $transactions = $this->model->getData('all', 'all', 'all', 'all', $dateRange, 9999);

        usort($transactions, function($a, $b) {
            return strtotime($a->tgl_transaksi) - strtotime($b->tgl_transaksi);
        });

        foreach($transactions as $transaction) {
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
            'signs'                 => $this->getSigns($this->userId, ['date' => $printDate, 'location' => 'Kota Bekasi'], $signFormat),
            'signFormat'            => $signFormat,
        ];

        $data = [
            'pageTitle' => $title,
            'content'   => view('report/kas_umum', $contentData),
        ];

        $html = view('layout/main', $data);
        $pdf->loadHTML($html)->render()->stream('Laporan-Kas-Umum.pdf');
        // return $html;
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

        $rightTitle = $options['location'] . ', ' . os_date()->create($options['date'], 'd-MM-y');
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