<?php namespace App\Controllers;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-type');

class Auth extends BaseController
{
    public function __construct()
    {   
        
    }

    public function validatePageRequest()
    {
        $status = valid_access() ? 200 : 503;

        return $this->response->setJSON($this->setStatus($status));
    }
}