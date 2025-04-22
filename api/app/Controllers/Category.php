<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\CategoryModel;

class Category extends BaseController
{
    private $model;
    
    public function __construct()
    {
        $this->model = new CategoryModel;
    }

    public function getDetail($id)
    {
        $data = $this->model->getDetail($id);

        return $this->response->setJSON($data);
    }

    public function delete($id)
    {
        if ($this->model->delete($id)) {
            return $this->response->setJSON([
                'code' => 200,
                'msg' => 'Kategori berhasil dihapus',
            ]);
        } else {
            return $this->response->setJSON([
                'code' => 500,
                'msg' => 'Terjadi kesalahan saat menghapus kategori',
            ]);
        }
    }

    public function save($id = null)
    {
        $validation = $this->validation();
        $data = $this->request->getPost(array_keys($validation->rules));

        if(! $this->validateData($data, $validation->rules, $validation->messages)) {
            return $this->response->setJSON([
                'code'  => 500,
                'msg'   => $this->validator->getErrors(),
            ]);
        } else {
            if ($id === null) {
                $this->model = $this->model->insert(array_merge($data, ['user_id' => auth()->id()]));
                $message = 'Berhasil menambahkan data kategori';
            } else {
                $this->model = $this->model->update($data, $id);
                $message = 'Kategori berhasil diperbarui';
            }

            return $this->response->setJSON([
                'code'      => 200,
                'msg'       => $message,
            ]);
        }
    }

    public function updateDefaultCategoryVisibility()
    {
        $this->model->updateDefaultCategoryVisibility($this->request->getPost('value'));
        return $this->response->setJSON(['code' => 200, 'status' => 'success']);
    }

    public function getDefaultCategorySetting()
    {
        return $this->response->setJSON([
            'hideDefault' => $this->model->getDefaultCategorySetting()->value
        ]);
    }

    public function getData($limit, $offset, $orderBy, $searchBy, $sort, $search = '')
    {
        $data = $this->model->getData($limit, $offset, $search);
        $totalRows = $this->model->getTotalRows($search);

        array_walk($data, function(&$item) {
            $item->category_type = ucfirst($item->category_type);
            $item->is_default = (int)$item->user_id === $this->model->defaultUserCategory ? 1 : 0;
        });

        return $this->response->setJSON([
            'totalRows' => $totalRows,
            'container' => $data
        ]);
    }

    private function validation()
    {
        $rules = [
            'category_name'     => ['label' => 'category_name', 'rules' => 'required'],
            'category_type'     => ['label' => 'category_type', 'rules' => 'required'],
        ];
        
        $messages = [
            'category_name'     => ['required' => $this->messages['required']],
            'category_type'     => ['required' => $this->messages['required']],
        ];

        return (object) ['rules' => $rules, 'messages' => $messages];
    }
}
