<?php namespace App\Controllers;

class UserManager extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new \App\Models\UserModel();
    }

    public function createUser()
    {
        $data = $this->request->getPost(['username', 'email', 'password']);
        $this->model->create($data);

        return $this->response->setJSON(['status' => 'success']);
    }

    public function updateUser()
    {
        $data = $this->request->getPost(['username', 'email', 'password']);
        $this->model->update($data);

        return $this->response->setJSON(['status' => 'success']);
    }

    public function deleteUser()
    {
        $email = $this->request->getPost('email');
        $this->model->deleteUser($email);    

        return $this->response->setJSON(['status' => 'success']);
    }
}