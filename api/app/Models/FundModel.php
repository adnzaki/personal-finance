<?php

namespace App\Models;

use App\Models\OwnershipModel;
use CodeIgniter\Database\BaseBuilder;

class FundModel extends Connector
{
    private $builder;

    private $builder2; // for tb_kepemilikan_sumber_dana
    
    public function __construct()
    {
        parent::__construct();

        $this->builder = $this->db->table($this->sumberDana);
        $this->builder2 = $this->db->table($this->pemilikSumberDana);
    }

    public function getDetail(int $id)
    {
        $fundSource = $this->builder->getWhere(['id' => $id])->getResult()[0];
        $ownership = $this->builder2->getWhere(['id_sumber_dana' => $id])->getResult();
    }

    public function getTotalFund($id)
    {
        $query = $this->builder2->select('jumlah_dana')->getWhere(['id_sumber_dana' => $id]);
        
        return $query->getNumRows() > 0 ? $query->getResult() : null;
    }

    public function getData(int $limit, int $offset, string $sort = 'ASC', string $search = ''): array
    {
        $field = 'nama';
        $query = $this->search($field, $search)->where($this->basicFilter)->orderBy($field, $sort)->limit($limit, $offset);

        return $query->get()->getResult();
    }

    public function getPemilik(): array
    {
        $ownership = new OwnershipModel;
        $rows = $ownership->getTotalRows();
        
        return $ownership->getData($rows, 0);
    }

    public function getDaftarKepemilikan(int $idSumberDana): array
    {
        $query = $this->builder
                    ->select('kepemilikan')
                    ->join($this->pemilikSumberDana, $this->sumberDana . '.id = ' . $this->pemilikSumberDana . '.id_sumber_dana')
                    ->join($this->kepemilikan, $this->pemilikSumberDana . '.id_kepemilikan = ' . $this->kepemilikan . '.id')
                    ->where($this->sumberDana . '.id', $idSumberDana)
                    ->where($this->pemilikSumberDana . '.deleted', 0);
        
        return $query->get()->getResult();
    }
    

    public function getTotalRows(string $search = ''): int
    {
        $query = $this->search('nama', $search)->where($this->basicFilter);
        
        return $query->countAllResults();
    }

    public function insert(array $data): int
    {
        $this->builder->insert($data);

        return $this->db->insertID();
    }

    public function insertOwnership(array $data)
    {
        $this->builder2->insert($data);
    }

    public function update(array $data, int $id): void
    {
        $this->builder->update($data, ['id' => $id]);
    }

    public function delete(int $id): bool
    {
        return $this->builder->update(['deleted' => 1], ['id' => $id]);
    }

    private function search(string $searchBy, string $search)
    {
        $select = $this->builder->select('id, nama, modified');
        if(! empty($search)) {
            $select->like($searchBy, $search);           
        }

        return $select;
    }
}