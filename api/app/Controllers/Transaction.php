<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\TransactionModel;

class Transaction extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new TransactionModel;
    }

    public function save($id = null)
    {
        if(valid_access()) {
            $transactionType = $this->request->getPost('jenis_transaksi');
            $validation = $this->validation($transactionType);
            $data = $this->request->getPost(array_keys($validation->rules));
            if (! $this->validateData($data, $validation->rules, $validation->messages)) {
                return $this->response->setJSON([
                    'code'  => 500,
                    'msg'   => $this->validator->getErrors(),
                ]);
            } else {
                $save = $this->model->save($data, $id);
                return $this->response->setJSON([
                    'code' => 200,
                    'msg' => 'Transaksi berhasil disimpan',
                    'data' => $save
                ]);
            }
        }
    }

    private function validation($transactionType)
    {
        $rules = [
            'id_sumber_dana'            => ['label' => 'sumber dana', 'rules' => 'required'],
            'id_pemilik_sumber_dana'    => ['label' => 'pemilik dana', 'rules' => 'required'],
            'jenis_transaksi'           => ['label' => 'jenis transaksi', 'rules' => 'required'],
            'tgl_transaksi'             => ['label' => 'tanggal transaksi', 'rules' => 'required'],
            'deskripsi'                 => ['label' => 'deskripsi', 'rules' => 'required'],
            'nominal'                   => ['label' => 'nominal', 'rules' => 'required|is_natural|greater_than[0]'],
        ];

        $messages = [
            'id_sumber_dana'            => ['required' => $this->messages['required']],
            'id_pemilik_sumber_dana'    => ['required' => $this->messages['required']],
            'jenis_transaksi'           => ['required' => $this->messages['required']],
            'tgl_transaksi'             => ['required' => $this->messages['required']],
            'deskripsi'                 => ['required' => $this->messages['required']],
            'nominal'                   => ['required' => $this->messages['required'], 'is_natural' => $this->messages['is_natural'], 'greater_than' => $this->messages['greater_than']],
        ];

        if($transactionType === 'transfer') {
            $rules['sumber_dana_tujuan'] = ['label' => 'sumber dana tujuan', 'rules' => 'required'];
            $rules['pemilik_dana_tujuan'] = ['label' => 'pemilik dana', 'rules' => 'required'];
            $messages['sumber_dana_tujuan'] = ['required' => $this->messages['required']];
            $messages['pemilik_dana_tujuan'] = ['required' => $this->messages['required']];
        } else {
            $rules['id_kategori'] = ['label' => 'kategori', 'rules' => 'required'];
            $messages['id_kategori'] = ['required' => $this->messages['required']];
        }

        return (object) ['rules' => $rules, 'messages' => $messages];
    }

    public function getCategories($type)
    {
        return $this->createResponse($this->model->getCagories($type));
    }

    public function getOwnerByFundId($fundId)
    {
        return $this->createResponse($this->model->getOwnerByFundId($fundId));
    }

    public function getTargetFunds($id)
    {
        return $this->createResponse($this->model->getFundSource($id));
    }

    public function getFundSource()
    {
        return $this->createResponse($this->model->getFundSource());
    }
}