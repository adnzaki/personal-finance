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

    public function updateDefaultCategoryVisibility()
    {
        if(valid_access()) {
            $this->model->updateDefaultCategoryVisibility($this->request->getPost('value'));
            return $this->response->setJSON(['code' => 200, 'status' => 'success']);
        }
    }

    public function getDefaultCategorySetting()
    {
        return $this->createResponse([
            'hideDefault' => $this->model->getDefaultCategorySetting()
        ]);
    }

    public function getData($limit, $offset, $orderBy, $searchBy, $sort, $search = '')
    {
        $data = $this->model->getData($limit, $offset, $orderBy, $sort, $search);
        $totalRows = $this->model->getTotalRows($search);

        array_walk($data, function(&$item) {
            $item->category_type = ucfirst($item->category_type);
            $item->is_default = (int)$item->user_id === $this->model->defaultUserCategory ? 1 : 0;
        });

        return $this->createResponse([
            'totalRows' => $totalRows,
            'container' => $data
        ]);
    }
}
