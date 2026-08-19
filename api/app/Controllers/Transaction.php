<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\TransactionModel;
use App\Models\CategoryModel;

class Transaction extends BaseController
{
    private TransactionModel $model;

    public function __construct()
    {
        $this->model = new TransactionModel;
    }

    public function getDetail(int $id)
    {
        $response = $this->model->getDetail($id);
        $response->nominal = number_format($response->nominal);
        $response->id_pemilik_sumber_dana = (int)$response->id_pemilik_sumber_dana;
        if($response->jenis_transaksi === 'transfer') {
            $response->nama_tujuan_transfer = $this->model->getDestinationTransferName($response->pemilik_dana_tujuan);
            if((int)$response->has_bea_admin === 1) {
                $getAdminFee = $this->model->getAdminFee($response->id_transaksi);
                if($getAdminFee !== null) {
                    $response->bea_admin = $this->model->getDetail($getAdminFee->id);
                    $response->bea_admin->nominal = number_format($response->bea_admin->nominal);
                }
            }
        }

        return $this->response->setJSON($response);
    }

    public function getData(string $sumberDana, string $pemilikSumberDana, string $jenisTransaksi, string $kategori, string $tanggal, string $idKepemilikan = 'all')
    {
        $limit      = (int)$this->request->getPost('limit');
        $offset     = (int)$this->request->getPost('offset');
        $orderBy    = $this->request->getPost('orderBy');
        $searchBy   = $this->request->getPost('searchBy');
        $sort       = $this->request->getPost('sort');
        $search     = $this->request->getPost('search') ?? '';   

        if($idKepemilikan !== 'all') {
            $this->model->setOwner($idKepemilikan);
        }
        
        $data = $this->model->getData($sumberDana, $pemilikSumberDana, $jenisTransaksi, $kategori, $tanggal, $limit, $offset, $sort, $searchBy, $search);
        $totalRows = $this->model->getTotalRows($sumberDana, $pemilikSumberDana, $jenisTransaksi, $kategori, $tanggal, $searchBy, $search);

        foreach($data as $d) {
            $nominal = 'Rp. '.number_format($d->nominal);
            if($d->jenis_transaksi === 'expense') {
                $d->nominal = '-'.$nominal;
            } else if($d->jenis_transaksi === 'income') {
                $d->nominal = '+'.$nominal;
            } else if($d->jenis_transaksi === 'transfer') {
                $d->nominal = $nominal;
                $d->sumber_dana .= ' → '.$this->model->getDestinationTransferName($d->pemilik_dana_tujuan)->sumber_dana;
                if((int)$d->has_bea_admin === 1) {
                    $getAdminFee = $this->model->getAdminFee($d->id);
                    if($getAdminFee !== null) {
                        $d->bea_admin = $this->model->getDetail($getAdminFee->id);
                    }
                }
            }
            
            $transactionDate = explode(' ', $d->tgl_transaksi)[0];
            $d->tgl_transaksi = os_date()->create($transactionDate);
            $d->tgl_transaksi_dayOnly = substr(os_date()->create($transactionDate, 'd-m-y', '/'), 0, 2);
            $d->tgl_transaksi_monthYear = substr(os_date()->create($transactionDate, 'd-M-y'), 3, 8);
        }

        return $this->response->setJSON([
            'container' => $data,
            'totalRows' => $totalRows
        ]);
    }

    public function delete(string $id)
    {
        $this->model->deleteTransaction($id);

        $findAdminFee = $this->model->getAdminFee($id);
        if($findAdminFee !== null) {
            $this->model->deleteTransaction($findAdminFee->id);
        }
        
        return $this->response->setJSON([
            'code' => 200,
            'msg' => 'Transaksi berhasil dihapus',
        ]);
    }

    public function getBeaAdminCategory()
    {
        $categoryModel = new CategoryModel();
        $beaAdminCategoryId = $categoryModel->getBeaAdminCategory();
        return $this->response->setJSON([
            'code' => 200,
            'id' => $beaAdminCategoryId
        ]);
    }

    public function save($id = null)
    {
        $transactionType = $this->request->getPost('jenis_transaksi');
        $validation = $this->validation($transactionType);
        $data = $this->request->getPost(array_keys($validation->rules));
        $data['has_bea_admin'] = (int)$this->request->getPost('has_bea_admin');
        $data['parent_id'] = $this->request->getPost('parent_id') !== '' ? (int)$this->request->getPost('parent_id') : null;
        if (! $this->validateData($data, $validation->rules, $validation->messages)) {
            return $this->response->setJSON([
                'code'  => 500,
                'msg'   => $this->validator->getErrors(),
            ]);
        } else {
            $save = $this->model->save($data, $id);
            if($id !== null && $data['has_bea_admin'] === 0) {
                $findAdminFee = $this->model->getAdminFee($id);
                if($findAdminFee !== null) {
                    $this->model->deleteTransaction($findAdminFee->id);
                }
            }
            return $this->response->setJSON([
                'code' => 200,
                'msg' => 'Transaksi berhasil disimpan',
                'data' => $save,
                'request' => $data
            ]);
        }
    }

    private function validation(string $transactionType)
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

    public function getCategories(string $type)
    {
        $model = new CategoryModel;
        $type = $type === 'all' ? null : $type;
        $categories = $model->getData(9999, 0, '', $type);
        return $this->response->setJSON($categories);
    }

    public function getOwnerByFundId(string $fundId, ?string $selected = null)
    {
        $data = $this->model->getOwnerByFundId($fundId);
        $response = [
            'owners' => $data,
            'selected' => $selected !== null ? $this->model->fundModel->getSelectedOwner($selected) : (object)[]
        ];

        return $this->response->setJSON($response);
    }

    public function getTargetFunds(string $id)
    {
        return $this->response->setJSON($this->model->getFundSource($id));
    }

    public function getFundSource()
    {
        return $this->response->setJSON($this->model->getFundSource());
    }
}