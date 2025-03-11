<?php

namespace App\Models;

use App\Models\OwnershipModel;

class FundModel extends Connector
{
    public $builder;

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
        $ownership = $this->builder2->select('id_kepemilikan, kepemilikan as name, jumlah_dana, id_sumber_dana')
                                    ->join($this->kepemilikan, $this->pemilikSumberDana . '.id_kepemilikan = ' . $this->kepemilikan . '.id')
                                    ->getWhere(['id_sumber_dana' => $id, $this->pemilikSumberDana . '.deleted' => 0])
                                    ->getResult();

        return [
            'fundSource' => $fundSource,
            'ownership' => $ownership
        ];
    }

    public function getTotalFund($id)
    {
        $query = $this->builder2->select('jumlah_dana')->getWhere(['id_sumber_dana' => $id, 'deleted' => 0]);
        
        return $query->getNumRows() > 0 ? $query->getResult() : null;
    }

    public function getBiggestFunds(): array
    {
        $query = $this->builder->select('id, nama, jumlah_dana')
                               ->join($this->pemilikSumberDana, $this->sumberDana . '.id = ' . $this->pemilikSumberDana . '.id_sumber_dana')
                               ->where([$this->pemilikSumberDana . '.deleted' => 0, 'user_id' => auth()->id()])
                               ->orderBy('jumlah_dana', 'DESC')
                               ->limit(3);

        return $query->get()->getResult();
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
                    ->select($this->pemilikSumberDana . '.id as value, kepemilikan as label, jumlah_dana, kepemilikan')
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
        // automatically insert or update ownership
        // $isExist = $this->builder2->where([
        //     'id_sumber_dana' => $data['id_sumber_dana'], 
        //     'id_kepemilikan' => $data['id_kepemilikan'],
        // ]);
        // if($isExist->countAllResults() > 0) {
        //     $this->builder2->update([
        //         // 'jumlah_dana' => $data['jumlah_dana'], 
        //         'deleted' => 0
        //     ], [
        //         'id_sumber_dana' => $data['id_sumber_dana'],
        //         'id_kepemilikan' => $data['id_kepemilikan']
        //     ]);
        //     $note = 'update';
        // } else {
        //     $note = 'insert';
        //     $this->builder2->insert($data);
        // }

        $this->builder2->insert($data);
    }

    public function deleteOwnership(int $fundId, int $ownershipId)
    {
        $this->builder2->update(['deleted' => 1], [
            'id_sumber_dana' => $fundId,
            'id_kepemilikan' => $ownershipId
        ]);
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