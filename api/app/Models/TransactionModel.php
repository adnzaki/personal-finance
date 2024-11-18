<?php

namespace App\Models;

class TransactionModel extends Connector
{
    private $builder; // for tb_transaksi

    private $categoryBuilder;

    public $fundModel; // FundingModel

    public function __construct()
    {
        parent::__construct();

        $this->builder = $this->db->table($this->transaksi);
        $this->categoryBuilder = $this->db->table($this->kategori);

        $this->fundModel = new FundModel;
    }

    public function getCagories(string $type): array
    {
        return $this->categoryBuilder->getWhere(['deleted' => 0, 'category_type' => $type])->getResult();
    }

    public function getOwnerByFundId(int $fundId): array
    {
        return $this->fundModel->getDaftarKepemilikan($fundId);
    }
    
    public function getFundSource(): array
    {
        return $this->fundModel->builder
                               ->select('id as value, nama as label')
                               ->getWhere($this->basicFilter)
                               ->getResult();
    }

    public function getData(
        $sumberDana = 'all',
        $kepemilikan = 'all',
        $jenisTransaksi = 'all',
        $kategori = 'all',
        int $limit, 
        int $offset, 
        string $sort = 'ASC', 
        string $searchBy = 'deskripsi', 
        string $search = ''): array
    {
        $query = $this->search($searchBy, $search);

        if ($sumberDana !== 'all') {
            $query->where('id_sumber_dana', $sumberDana);
        }

        if ($kepemilikan !== 'all') {
            $query->where('id_kepemilikan', $kepemilikan);
        }

        if ($jenisTransaksi !== 'all') {
            $query->where('jenis_transaksi', $jenisTransaksi);
        }

        if ($kategori !== 'all') {
            $query->where('id_kategori', $kategori);
        }

        $query->where($this->basicFilter)->orderBy('tgl_transaksi', $sort)->limit($limit, $offset);

        return $query->get()->getResult();
    }

    private function search(string $searchBy, string $search)
    {
        $select = $this->builder->select('id, id_sumber_dana, id_kepemilikan, jenis_transaksi, deskripsi, nominal, id_kategori, category_name, category_type, kepemilikan, nama, modified');
        if (! empty($search)) {
            $select->like($searchBy, $search); // search by one parameter
        }

        return $select;
    }
}