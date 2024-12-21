<?php

namespace App\Models;

class OwnershipModel extends Connector
{
    public $builder;

    private $builder2; // for tb_kepemilikan_sumber_dana
    public function __construct()
    {
        parent::__construct();

        $this->builder = $this->db->table($this->kepemilikan);
        $this->builder2 = $this->db->table($this->pemilikSumberDana);
    }

    public function getDetail(int $id)
    {
        return $this->builder->getWhere(['id' => $id])->getResult()[0];
    }

    public function getTotalFund($id)
    {
        $query = $this->builder2->select('jumlah_dana')
                      ->join($this->sumberDana, $this->sumberDana . '.id = ' . $this->pemilikSumberDana . '.id_sumber_dana')
                      ->getWhere(['id_kepemilikan' => $id, "{$this->sumberDana}.deleted" => 0]);
        
        return $query->getNumRows() > 0 ? $query->getResult() : null;
    }

    public function getData(int $limit, int $offset, string $sort = 'ASC', string $search = ''): array
    {
        $field = 'kepemilikan';
        
        $query = $this->search($field, $search)->where($this->basicFilter)->orderBy($field, $sort)->limit($limit, $offset);

        return $query->get()->getResult();
    }

    public function getTotalRows(string $search = ''): int
    {
        $query = $this->search('kepemilikan', $search)->where($this->basicFilter);
        
        return $query->countAllResults();
    }

    public function insert(array $data): int
    {
        $this->builder->insert($data);

        return $this->db->insertID();
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
        $select = $this->builder->select('id, kepemilikan, modified');
        if(! empty($search)) {
            $select->like($searchBy, $search);           
        }

        return $select;
    }
}