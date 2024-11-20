<?php

namespace App\Models;

class TransactionModel extends Connector
{
    private $builder; // for tb_transaksi

    private $categoryBuilder;

    private $fundOwner;

    public $fundModel; // FundingModel

    private $defaultFilter;

    public function __construct()
    {
        parent::__construct();

        $this->builder = $this->db->table($this->transaksi);
        $this->categoryBuilder = $this->db->table($this->kategori);
        $this->fundOwner = $this->db->table($this->pemilikSumberDana);

        $this->fundModel = new FundModel;
        $this->defaultFilter = [$this->sumberDana . '.deleted' => 0, $this->sumberDana . '.user_id' => auth()->id()];
    }

    public function save($data, $id)
    {
        // Get the fund source details for the given source fund ID
        $fundOwnerId = (int)$data['id_pemilik_sumber_dana'];
        $getBalance = (int)$this->fundOwner->getWhere(['id' => $fundOwnerId])->getResult()[0]->jumlah_dana;
        $params = ['id' => $fundOwnerId];

        $transactionData = [];

        if(array_key_exists('pemilik_dana_tujuan', $data)) {
            $destinationFundId = (int)$data['pemilik_dana_tujuan'];
        }

        $data['nominal'] = (int) $data['nominal'];
        $data['deskripsi'] = ucfirst($data['deskripsi']);

        if ($data['jenis_transaksi'] === 'transfer') {
            // Get the target fund details for the destination fund ID
            $destinationBalance = (int)$this->fundOwner->getWhere(['id' => $destinationFundId])->getResult()[0]->jumlah_dana;

            // Update the target fund by increasing its amount with the transaction nominal
            $this->fundOwner->update(['jumlah_dana' => $destinationBalance + $data['nominal']], ['id' => $destinationFundId]);

            // Update the source fund by decreasing its amount with the transaction nominal
            $this->fundOwner->update(['jumlah_dana' => $getBalance - $data['nominal']], $params);

            // record transaction data, remove unnecessary data
            unset($data['sumber_dana_tujuan'], $data['pemilik_dana_tujuan']);
            $data['id_kategori'] = $this->categoryBuilder->getWhere(['deleted' => 0, 'category_type' => 'transfer'])->getResult()[0]->id;
            $this->builder->insert($data);
        } else {
            if ($id === null) {
                // Insert the transaction data into the transactions table
                $this->builder->insert($data);
    
                if ($data['jenis_transaksi'] === 'income') {
                    $this->fundOwner->update(['jumlah_dana' => $getBalance + $data['nominal']], $params);
                } else if ($data['jenis_transaksi'] === 'expense') {
                    $this->fundOwner->update(['jumlah_dana' => $getBalance - $data['nominal']], $params);

                    $transactionData[] = [
                        'amount' => $data['nominal'],
                        'balance' => $getBalance,
                        'newBalance' => $getBalance - $data['nominal'],
                    ];
                }
            // If the transaction ID is not null, update the existing transaction data
            } else {
                // Get the previous transaction amount
                $previousAmount = (int)$this->builder->select('nominal')->getWhere(['id' => $id])->getResult()[0]->nominal;
    
                // Calculate the difference between the previous amount and the new amount
                $difference = $data['nominal'] - $previousAmount;
    
                if ($data['jenis_transaksi'] === 'income') {
                    $this->fundOwner->update(['jumlah_dana' => $getBalance + $difference], $params);
                } else if ($data['jenis_transaksi'] === 'expense') {
                    $this->fundOwner->update(['jumlah_dana' => $getBalance - $difference], $params);
                }
    
                // Update the transaction data
                $this->builder->update($data, ['id' => $id]);

                $transactionData[] = [
                    'amount' => $data['nominal'],
                    'previousAmount' => $previousAmount,
                    'balance' => $getBalance,
                    'newBalance' => $getBalance - $difference,
                ];
            }
        }

        return $transactionData;
    }

    public function getCagories(string $type): array
    {
        return $this->categoryBuilder->getWhere(['deleted' => 0, 'category_type' => $type])->getResult();
    }

    public function getOwnerByFundId(int $fundId): array
    {
        return $this->fundModel->getDaftarKepemilikan($fundId);
    }

    public function getFundSource($id = null): array
    {
        $query = $this->fundModel->builder->select('id as value, nama as label')->where($this->basicFilter);
        if ($id !== null) {
            $query->where(['id !=' => $id]);
        }

        return $query->get()->getResult();
    }

    public function getData(
        $sumberDana = 'all',
        $kepemilikan = 'all',
        $jenisTransaksi = 'all',
        $kategori = 'all',
        $tanggal = 'all',
        int $limit,
        int $offset,
        string $sort = 'DESC',
        string $searchBy = 'deskripsi',
        string $search = ''
    ): array {
        $query = $this->search($searchBy, $search);

        if ($sumberDana !== 'all') {
            $query->where($this->sumberDana . '.id', $sumberDana);
        }

        if ($kepemilikan !== 'all') {
            $query->where('id_pemilik_sumber_dana', $kepemilikan);
        }

        if ($jenisTransaksi !== 'all') {
            $query->where('jenis_transaksi', $jenisTransaksi);
        }

        if ($kategori !== 'all') {
            $query->where('id_kategori', $kategori);
        }

        if($tanggal !== 'all') {
            if(strpos($tanggal, '_') !== false) {
                $date = explode('_', $tanggal);
                $query->where([
                    'tgl_transaksi >= ' => $date[0] . ' 00:00:00',
                    'tgl_transaksi <= ' => $date[1] . ' 23:59:59'
                ]);
            } else {
                $query->like('tgl_transaksi', $tanggal);
            }
        }

        $query->where($this->defaultFilter)->orderBy('tgl_transaksi', $sort)->limit($limit, $offset);

        return $query->get()->getResult();
   }

    public function getTotalRows(
        $sumberDana = 'all',
        $kepemilikan = 'all',
        $jenisTransaksi = 'all',
        $kategori = 'all',
        $tanggal = 'all',
        string $searchBy = 'deskripsi',
        string $search = ''
    ): int {
        $query = $this->search($searchBy, $search);

        if ($sumberDana !== 'all') {
            $query->where($this->sumberDana . '.id', $sumberDana);
        }

        if ($kepemilikan !== 'all') {
            $query->where('id_pemilik_sumber_dana', $kepemilikan);
        }

        if ($jenisTransaksi !== 'all') {
            $query->where('jenis_transaksi', $jenisTransaksi);
        }

        if ($kategori !== 'all') {
            $query->where('id_kategori', $kategori);
        }

        if ($tanggal !== 'all') {
            if(strpos($tanggal, '_') !== false) {
                $date = explode('_', $tanggal);
                $query->where([
                    'tgl_transaksi >= ' => $date[0] . ' 00:00:00',
                    'tgl_transaksi <= ' => $date[1] . ' 23:59:59'
                ]);
            } else {
                $query->like('tgl_transaksi', $tanggal);
            }
        }

        return $query->where($this->defaultFilter)->countAllResults();
    }

    private function search(string $searchBy, string $search)
    {
        $field = "{$this->transaksi}.id, $this->sumberDana.id as id_sumber_dana, $this->sumberDana.nama as sumber_dana, id_pemilik_sumber_dana, kepemilikan as nama_pemilik, jenis_transaksi, tgl_transaksi, deskripsi, nominal, id_kategori, category_name, $this->transaksi.modified";
        $select = $this->builder->select($field)
                                ->join($this->pemilikSumberDana, $this->pemilikSumberDana . '.id = ' . $this->transaksi . '.id_pemilik_sumber_dana')
                                ->join($this->sumberDana, $this->sumberDana . '.id = ' . $this->pemilikSumberDana . '.id_sumber_dana')
                                ->join($this->kategori, $this->kategori . '.id = ' . $this->transaksi . '.id_kategori')
                                ->join($this->kepemilikan, $this->kepemilikan . '.id = ' . $this->pemilikSumberDana . '.id_kepemilikan');
        if (! empty($search)) {
            $select->like($searchBy, $search); // search by one parameter
        }

        return $select;
    }
}
