<?php namespace App\Models;

use CodeIgniter\Model;

class SubscriptionModel extends Model
{
    protected $table = 'tb_langganan';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'user_id', 'plan', 'status', 'started_at', 'ended_at', 'created_at', 'updated_at'
    ];
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    public function checkActivation($userId)
    {
        return $this->where('user_id', $userId)
                    ->where('status', 'active')
                    ->first() !== null;
    }

    public function checkActivePeriod($userId)
    {
        $subscription = $this->where('user_id', $userId)
                             ->where('status', 'active')
                             ->first();

        if ($subscription && $subscription['ended_at']) {
            $endedAt = new \DateTime($subscription['ended_at']);
            $now = new \DateTime();

            return $now < $endedAt;
        }

        return false;
    }

    public function hasSubscription($userId)
    {
        return $this->where('user_id', $userId)->first() !== null;
    }

    public function getSubscriptionByUserId($userId)
    {
        return $this->where('user_id', $userId)->first();
    }
}