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

    public function getDetail($id)
    {
        $response = $this->model->getDetail($id);
        $response->nominal = number_format($response->nominal);
        $response->id_pemilik_sumber_dana = (int)$response->id_pemilik_sumber_dana;
        if($response->jenis_transaksi === 'transfer') {
            $response->nama_tujuan_transfer = $this->model->getDestinationTransferName($response->pemilik_dana_tujuan);
        }

        return $this->createResponse($response);
    }

    public function getData($sumberDana, $kepemilikan, $jenisTransaksi, $kategori, $tanggal, $limit, $offset, $orderBy, $searchBy, $sort, $search = '')
    {
        $data = $this->model->getData($sumberDana, $kepemilikan, $jenisTransaksi, $kategori, $tanggal, $limit, $offset, $sort, $searchBy, $search);
        $totalRows = $this->model->getTotalRows($sumberDana, $kepemilikan, $jenisTransaksi, $kategori, $tanggal, $searchBy, $search);

        foreach($data as $d) {
            $nominal = 'Rp. '.number_format($d->nominal);
            if($d->jenis_transaksi === 'expense') {
                $d->nominal = '-'.$nominal;
            } else {
                $d->nominal = '+'.$nominal;
            }
            
            $transactionDate = explode(' ', $d->tgl_transaksi)[0];
            $d->tgl_transaksi = os_date()->create($transactionDate);
            $d->tgl_transaksi_dayOnly = substr(os_date()->create($transactionDate, 'd-m-y', '/'), 0, 2);
            $d->tgl_transaksi_monthYear = substr(os_date()->create($transactionDate, 'd-M-y'), 3, 8);
        }

        return $this->createResponse([
            'container' => $data,
            'totalRows' => $totalRows
        ]);
    }

    public function delete($id)
    {
        if (valid_access()) {
            $this->model->deleteTransaction($id);
            
            return $this->response->setJSON([
                'code' => 200,
                'msg' => 'Transaksi berhasil dihapus',
            ]);
        } else {
            return $this->response->setJSON([
                'code' => 500,
                'msg' => lang('Messages.invalid_access'),
            ]);
        }
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
            'id_pemilik_sumber_dana'    => ['label' => 'pemilik dana', 'rules' => 'required'],
            'jenis_transaksi'           => ['label' => 'jenis transaksi', 'rules' => 'required'],
            'tgl_transaksi'             => ['label' => 'tanggal transaksi', 'rules' => 'required'],
            'deskripsi'                 => ['label' => 'deskripsi', 'rules' => 'required'],
            'nominal'                   => ['label' => 'nominal', 'rules' => 'required|is_natural|greater_than[0]'],
        ];

        $messages = [
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