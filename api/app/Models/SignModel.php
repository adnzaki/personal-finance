<?php namespace App\Models;

class SignModel extends \CodeIgniter\Model
{
    protected $table = 'tb_signer';
    protected $primaryKey = 'id';
    protected $useTimestamps = true;
    protected $returnType = 'object';

    public function getSignersByUserId($userId)
    {
        return $this->where('user_id', $userId)
                    ->where('deleted_at', null)
                    ->orderBy('level', 'ASC')
                    ->findAll();
    }

    public function getSignerByLevel($level, $userId)
    {
        return $this->where('user_id', $userId)
                    ->where('level', $level)
                    ->where('deleted_at', null)
                    ->first();
    }
}