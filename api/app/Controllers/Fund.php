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
        $data = $this->model->getData($limit, $offset, $sort, $search);
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

        return $this->createResponse([
            'container' => $data,
            'totalRows' => $rows,
        ]);
    }

    public function delete($id)
    {
        if(valid_access()) {
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
    }
    

    public function getDetail($id)
    {
        $data = $this->model->getDetail($id);

        return $this->createResponse($data);
    }

    public function save($id = null)
    {
        if(valid_access()) {
            $validation = $this->validation();
            $data = $this->request->getPost(array_keys($validation->rules));
    
            if(! $this->validateData($data, $validation->rules, $validation->messages)) {
                return $this->response->setJSON([
                    'code'  => 500,
                    'msg'   => $this->validator->getErrors(),
                ]);
            } else {
                if($id === null) {
                    $this->model = $this->model->insert($data);
                    $message = 'Berhasil menambahkan sumber dana';
                } else {
                    $this->model = $this->model->update($data, $id);
                    $message = 'Sumber dana berhasil diperbarui';
                }
    
                return $this->response->setJSON([
                    'code'      => 200,
                    'msg'       => $message,
                ]);
            }
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
