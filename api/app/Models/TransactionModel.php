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
        $this->defaultFilter = [$this->transaksi . '.deleted' => 0, $this->sumberDana . '.user_id' => auth()->id()];
    }

    public function getDetail($id) 
    {
        $field = "$this->transaksi.id as id_transaksi, $this->sumberDana.id as id_sumber_dana, nama as sumber_dana, id_pemilik_sumber_dana, category_name, sumber_dana_tujuan, pemilik_dana_tujuan, jenis_transaksi, tgl_transaksi, deskripsi, nominal, id_kategori";
        $query = $this->builder->select($field)
            ->join($this->pemilikSumberDana, $this->pemilikSumberDana . '.id = ' . $this->transaksi . '.id_pemilik_sumber_dana')
            ->join($this->sumberDana, $this->sumberDana . '.id = ' . $this->pemilikSumberDana . '.id_sumber_dana')
            ->join($this->kategori, $this->kategori . '.id = ' . $this->transaksi . '.id_kategori')
            ->join($this->kepemilikan, $this->kepemilikan . '.id = ' . $this->pemilikSumberDana . '.id_kepemilikan')
            ->getWhere(["$this->transaksi.id" => $id])->getResult()[0];

        return $query;
    }

    public function getDestinationTransferName($ownerId)
    {
        $field = 'nama as sumber_dana, kepemilikan';
        $query = $this->builder->select($field)
                               ->join($this->pemilikSumberDana, $this->pemilikSumberDana . '.id = ' . $this->transaksi . '.pemilik_dana_tujuan')
                               ->join($this->sumberDana, $this->sumberDana . '.id = ' . $this->pemilikSumberDana . '.id_sumber_dana')
                               ->join($this->kepemilikan, $this->kepemilikan . '.id = ' . $this->pemilikSumberDana . '.id_kepemilikan')
                               ->getWhere([$this->pemilikSumberDana . '.id' => $ownerId]);

        return $query->getNumRows() > 0 ? $query->getResult()[0] : (object)['sumber_dana' => '', 'kepemilikan' => ''];
    }

    public function deleteTransaction($id)
    {
        $this->builder->update(['deleted' => 1], ['id' => $id]);
        $transactionDetail = $this->getDetail($id);
        $amount = (int)$transactionDetail->nominal;
        $ownerId = (int)$transactionDetail->id_pemilik_sumber_dana;
        $ownerBalance = $this->getBalance($ownerId);
        $this->fundOwner->update(['jumlah_dana' => $ownerBalance + $amount], ['id' => $ownerId]);
        if($transactionDetail->jenis_transaksi === 'transfer') {
            // Return the balance of receiver
            $receiverId = (int)$transactionDetail->pemilik_dana_tujuan;
            $receiverBalance = $this->getBalance($receiverId);
            $this->fundOwner->update(['jumlah_dana' => $receiverBalance - $amount], ['id' => $receiverId]);
        }
    }

    public function save($data, $id)
    {
        // Get the fund source details for the given source fund ID
        $fundOwnerId = (int)$data['id_pemilik_sumber_dana'];
        
        $currentBalance = $this->getBalance($fundOwnerId);
        $params = ['id' => $fundOwnerId];

        $transactionData = [];

        if(array_key_exists('pemilik_dana_tujuan', $data)) {
            $destinationFundId = (int)$data['pemilik_dana_tujuan'];
            $destinationBalance = (int)$this->fundOwner->getWhere(['id' => $destinationFundId])->getResult()[0]->jumlah_dana;
        }

        $data['deskripsi'] = ucfirst($data['deskripsi']);
        $amount = (int) $data['nominal'];

        if ($id === null) {
            if ($data['jenis_transaksi'] === 'transfer') {

                // Update the target fund by increasing its amount with the transaction nominal
                $this->fundOwner->update(['jumlah_dana' => $destinationBalance + $amount], ['id' => $destinationFundId]);

                // Update the source fund by decreasing its amount with the transaction nominal
                $this->fundOwner->update(['jumlah_dana' => $currentBalance - $amount], $params);

                // override category for transfer type
                $data['id_kategori'] = $this->categoryBuilder->getWhere(['deleted' => 0, 'category_type' => 'transfer'])->getResult()[0]->id;
            } else if ($data['jenis_transaksi'] === 'income') {
                $this->fundOwner->update(['jumlah_dana' => $currentBalance + $amount], $params);
            } else if ($data['jenis_transaksi'] === 'expense') {
                $this->fundOwner->update(['jumlah_dana' => $currentBalance - $amount], $params);
            }

            $transactionData[] = [
                'amount' => $amount,
                'balance' => $currentBalance,
                'newBalance' => $currentBalance - $amount,
            ];

            $this->builder->insert($data);            
        } else {
            $previousTransaction = $this->getDetail($id);
            
            // Get the previous transaction amount
            $previousAmount = (int)$previousTransaction->nominal;
            $previousFundOwner = (int)$previousTransaction->id_pemilik_sumber_dana;

            $previousOwnerBalance = $this->getBalance($previousFundOwner);

            // Calculate the difference between the previous amount and the new amount
            $difference = $amount - $previousAmount;
            $newAmount = 0;

            // if user changes the fund owner, 
            // then return the balance of the previous owner that used by previous transaction
            if($previousFundOwner !== $fundOwnerId) {
                $newAmount = $amount;
                $this->fundOwner->update(['jumlah_dana' => $previousOwnerBalance + $previousAmount], ['id' => $previousFundOwner]);
            } else {
                $newAmount = $difference;
            }

            if ($data['jenis_transaksi'] === 'transfer') {
                $previousDestinationId = $previousTransaction->pemilik_dana_tujuan;
                if($previousDestinationId === $destinationFundId) {
                    // if the destination ID is the same as the previous destination ID
                    // then new amount should be the difference between the previous amount and the new amount
                    $newAmount = $difference;                    
                } else {
                    // if the destination ID is different from the previous destination ID
                    // count with the new amount provided by the user
                    $newAmount = $amount;

                    // return the balance of previous destination ID before the transaction
                    $previousDestinationBalance = $this->fundOwner->getWhere(['id' => $previousDestinationId])->getResult()[0]->jumlah_dana;
                    $this->fundOwner->update(['jumlah_dana' => $previousDestinationBalance - $previousAmount], ['id' => $previousDestinationId]);
                }

                // Update the destination fund ID balance by increasing its amount with the transaction nominal
                $this->fundOwner->update(['jumlah_dana' => $destinationBalance + $newAmount], ['id' => $destinationFundId]);

                if($previousFundOwner === $fundOwnerId) {
                    $newAmount = $difference;
                }
                
                // Update the source fund ID balance by decreasing its amount with the transaction nominal
                $this->fundOwner->update(['jumlah_dana' => $currentBalance - $newAmount], $params);

                // override category for transfer type
                $data['id_kategori'] = $this->categoryBuilder->getWhere(['deleted' => 0, 'category_type' => 'transfer'])->getResult()[0]->id;
            } else if ($data['jenis_transaksi'] === 'income') {
                $this->fundOwner->update(['jumlah_dana' => $currentBalance + $newAmount], $params);
            } else if ($data['jenis_transaksi'] === 'expense') {
                $this->fundOwner->update(['jumlah_dana' => $currentBalance - $newAmount], $params);
            }

            // Update the transaction data
            $this->builder->update($data, ['id' => $id]);

            $transactionData[] = [
                'previousTransaction' => $previousTransaction,
                'updatedTransaction' => $data
            ];
        }

        return $transactionData;
    }

    public function getBalance($ownerId)
    {
        return (int)$this->fundOwner->getWhere(['id' => $ownerId])->getResult()[0]->jumlah_dana;
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
