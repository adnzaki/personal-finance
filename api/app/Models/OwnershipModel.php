<?php

namespace App\Models;

class OwnershipModel extends Connector
{
    private $builder;
    
    public function __construct()
    {
        parent::__construct();

        $this->builder = $this->db->table($this->kepemilikan);
    }

    public function getData(int $limit, int $offset, string $sort = 'ASC', string $search = ''): array
    {
        $field = 'kepemilikan';
        $query = $this->search($field, $search)->where('deleted', 0)->orderBy($field, $sort)->limit($limit, $offset);

        return $query->get()->getResult();
    }

    public function getTotalRows(string $search = ''): int
    {
        $query = $this->search('kepemilikan', $search)->where('deleted', 0);
        
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

    public function delete(int $id): void
    {
        $this->builder->update(['deleted' => 1], ['id' => $id]);
    }

    private function search(string $searchBy, string $search)
    {
        $select = $this->builder->select('kepemilikan, modified');
        if(! empty($search)) {
            $select->like($searchBy, $search);           
        }

        return $select;
    }
}