<?php namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\SubscriptionModel;

class Subscriptions implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $subscriptionModel = new SubscriptionModel;
        $checkActivation = $subscriptionModel->checkActivation(auth()->id());
        $checkActivePeriod = $subscriptionModel->checkActivePeriod(auth()->id());
        $subscription = $subscriptionModel->where('user_id', auth()->id())->first();

        /** @var \CodeIgniter\HTTP\Response */
        $response = service('response');
        if (!$subscription || !$checkActivation || !$checkActivePeriod) {
            return $response
                ->setStatusCode(403)
                ->setJSON([
                    'status' => 'no_subscription',
                    'error' => 'Mohon maaf, Anda tidak memiliki langganan aktif. Silakan berlangganan untuk mengakses fitur ini.',
                ]);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null): void
    {
        // Do something here
    }
}