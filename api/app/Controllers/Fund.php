<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\FundModel;

class Fund extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new FundModel;
    }

    public function getData($limit, $offset, $orderBy, $searchBy, $sort, $search = '')
    {
        $data = $this->model->getData($limit, $offset, $search);
        $rows = $this->model->getTotalRows($search);

        foreach($data as $d) {
            $totalFund = $this->model->getTotalFund($d->id);
            if($totalFund !== null) {
                $d->total_dana = 'Rp. '.number_format(array_sum(array_column($totalFund, 'jumlah_dana')), 2);
            } else {
                $d->total_dana = 'Rp. 0.00';
            }

            $d->pemilik = $this->model->getDaftarKepemilikan($d->id);
        }

        return $this->response->setJSON([
            'container' => $data,
            'totalRows' => $rows,
        ]);
    }

    public function getPemilik()
    {
        $data = $this->model->getPemilik();

        return $this->response->setJSON($data);
    }

    public function delete($id)
    {
        if($this->model->delete($id)) {
            return $this->response->setJSON([
                'code' => 200,
                'msg' => 'Data berhasil dihapus',
            ]);
        } else {
            return $this->response->setJSON([
                'code' => 500,
                'msg' => 'Terjadi kesalahan saat menghapus data',
            ]);
        }            
    }
    

    public function getDetail($id)
    {
        $data = $this->model->getDetail($id);

        return $this->response->setJSON($data);
    }

    public function save($id = null)
    {
        $balance = json_decode($this->request->getPost('kepemilikan'));
        $removedBalance = json_decode($this->request->getPost('deletedBalance'));

        $validation = $this->validation();
        $data = $this->request->getPost(array_keys($validation->rules));

        if(! $this->validateData($data, $validation->rules, $validation->messages)) {
            return $this->response->setJSON([
                'code'  => 500,
                'msg'   => $this->validator->getErrors(),
            ]);
        } else {
            if($id === null) {
                $insertId = $this->model->insert(array_merge($data, ['user_id' => auth()->id()]));
                foreach($balance as $b) {
                    $this->model->insertOwnership([
                        'id_sumber_dana' => $insertId,
                        'id_kepemilikan' => $b->id_kepemilikan,
                        'jumlah_dana' => 0
                    ]);
                }
                $message = 'Berhasil menambahkan sumber dana';
            } else {
                foreach($removedBalance as $b) {
                    $this->model->deleteOwnership($b->fundId, $b->ownerId);
                }

                foreach ($balance as $b) {
                    $this->model->insertOwnership([
                        'id_sumber_dana' => $id,
                        'id_kepemilikan' => $b->id_kepemilikan,
                        'jumlah_dana' => 0
                    ]);
                }

                $this->model->update($data, $id);
                $message = 'Sumber dana berhasil diperbarui';
            }

            return $this->response->setJSON([
                'code'          => 200,
                'msg'           => $message,
                'data'          => $data,
                'kepemilikan'   => $balance
            ]);
        }
    }


    private function validation()
    {
        $rules = [
            'nama'  => ['label' => 'sumber dana', 'rules' => 'required'],
        ];
        
        $messages = [
            'nama'  => ['required' => $this->messages['required']],
        ];

        return (object) ['rules' => $rules, 'messages' => $messages];
    }
}
