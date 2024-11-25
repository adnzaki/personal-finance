<?php namespace App\Controllers;

use App\Models\TransactionModel;
use App\Models\FundModel;

class Dashboard extends BaseController
{
    private $fundModel;

    private $transactionModel;

    public function __construct()
    {
        $this->fundModel = new FundModel();
        $this->transactionModel = new TransactionModel();
    }

    public function getTransactionByCategory()
    {
        $date = getdate();
        $date1 = $date['year'] . '-' . $date['mon'] . '-01';
        $date2 = $date['year'] . '-' . $date['mon'] . '-' . os_date()->daysInMonth($date['mon'], $date['year']);

        $income = $this->transactionModel->getTransactionByCategory('income', $date1, $date2);
        $expense = $this->transactionModel->getTransactionByCategory('expense', $date1, $date2);
        $transfer = $this->transactionModel->getTransactionByCategory('transfer', $date1, $date2);

        $data = [
            'income' => $income,
            'expense' => $expense,
            'transfer' => $transfer
        ];
        
        return $this->createResponse($data);
    }

    public function getBiggestFunds()
    {
        $totalRows = $this->fundModel->getTotalRows();
        $data = $this->fundModel->getData($totalRows, 0);

        foreach ($data as $d) {
            $totalFund = $this->fundModel->getTotalFund($d->id);
            if ($totalFund !== null) {
                $d->total_dana_num = array_sum(array_column($totalFund, 'jumlah_dana'));
                $d->total_dana = 'Rp. ' . number_format($d->total_dana_num);
            } else {
                $d->total_dana_num = 0;
                $d->total_dana = 'Rp. 0,00';
            }

            $d->pemilik = $this->fundModel->getDaftarKepemilikan($d->id);

            foreach($d->pemilik as $pemilik) {
                $pemilik->jumlah_dana = number_format($pemilik->jumlah_dana);
            }
        }

        usort($data, function ($a, $b) {
            return $b->total_dana_num <=> $a->total_dana_num;
        });

        $biggestBalance = array_slice($data, 0, 3);

        return $this->createResponse([
            'funds' => $biggestBalance,
            'rows' => count($biggestBalance),
        ]);
    }
}