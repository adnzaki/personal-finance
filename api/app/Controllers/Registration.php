<?php namespace App\Controllers;

use CodeIgniter\Shield\Validation\ValidationRules;
use App\Models\UserModel;

class Registration extends BaseController
{
    public function signup()
    {
        $validation = $this->validation();
        $data = $this->request->getPost(array_keys($validation['rules']));

        if(! $this->validateData($data, $validation['rules'], $validation['messages'])) {
            return $this->response->setJSON([
                'code'  => 500,
                'msg'   => $this->validator->getErrors(),
                'msgString' => explode('|', implode('|', $this->validator->getErrors()))[0],
            ]);
        } else {
            $userModel = new UserModel();
            $values = $this->request->getPost(['username', 'email', 'password']);
            $userModel->create($values);
            
            return $this->response->setJSON([
                'code'  => 200,
                'msg'   => 'success',
            ]);
        }
    }

    private function validation()
    {
        $rules = new ValidationRules();

        $messages = [
            'username' => [
                'required' => $this->messages['required'],
                'is_unique' => $this->messages['is_unique'],
                'max_length' => $this->messages['max_length'],
                'min_length' => $this->messages['min_length'],
                'regex_match' => 'Kolom {field} hanya boleh berisi huruf, angka dan titik (tanpa spasi)',
            ],
            'email' => [
                'required' => $this->messages['required'],
                'is_unique' => $this->messages['is_unique_email'],
                'max_length' => $this->messages['max_length'],
                'valid_email' => $this->messages['valid_email'],
            ],
            'password' => [
                'required' => $this->messages['required'],
                'max_length' => $this->messages['max_length'],
                'strong_password' => 'Password harus berisi minimal 8 karakter serta tidak berisi username atau email yang anda gunakan',
            ],
            'password_confirm' => [
                'required' => $this->messages['required'],
                'matches' => $this->messages['matches'],
            ],
        ];

        return ['rules' => $rules->getRegistrationRules(), 'messages' => $messages];
    }
}