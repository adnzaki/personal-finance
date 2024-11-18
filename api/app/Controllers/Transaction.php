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

    public function getCategories($type)
    {
        return $this->createResponse($this->model->getCagories($type));
    }

    public function getOwnerByFundId($fundId)
    {
        return $this->createResponse($this->model->getOwnerByFundId($fundId));
    }

    public function getFundSource()
    {
        return $this->createResponse($this->model->getFundSource());
    }
}