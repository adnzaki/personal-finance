<?php namespace App\Controllers;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-type');

use App\Models\AuthModel;

class Auth extends BaseController
{
    private $model;

    public function __construct()
    {   
        $this->model = new AuthModel();    
    }

    public function validateLogin()
    {
        $credentials = [
            'username'  => $this->request->getPost('username'),
            'password'  => $this->request->getPost('password')
        ];

        // $rememberMe = $this->request->getPost('rememberMe') === 1 ? true : false;

        $getToken = $this->model->validateLogin($credentials);
        if($getToken['status'] !== false) {
            return $this->response->setJSON([
                'status'    => 'success',
                'token'     => $getToken['token'],
                'user'      => auth()->getProvider()->findById(auth()->id())
            ]);
        } else {
            return $this->response->setJSON([
                'status'    => 'failed',
                'message'   => 'Login gagal. Silakan periksa kembali username dan password anda.',
                'reason'    => $getToken['reason']
            ]);
        }
    }

    public function logout()
    {
        if(auth()->loggedIn()) {
            auth()->logout();
        }

        return $this->response->setJSON(['status' => 'success']);
    }

    public function validatePageRequest()
    {
        $status = valid_access() ? 200 : 503;

        return $this->response->setJSON($this->setStatus($status));
    }
}