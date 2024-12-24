<?php namespace App\Controllers;

use App\Models\StatisticModel;

class Statistic extends BaseController
{
    private $model;

    public function __construct()
    {
        $this->model = new StatisticModel;
    }

    public function getTotalBalance($dateRange)
    {
        $balance = $this->model->getTotalBalance($dateRange);

        return $this->createResponse($balance);
    }

    public function getAllTransactionByCategory($dateRange)
    {
        if (strpos($dateRange, '_') !== false) {
            $date = explode('_', $dateRange);
            $date1 = $date[0];
            $date2 = $date[1];
        } else {
            $date1 = $dateRange;
            $date2 = $dateRange;
        }

        $income = $this->model->getAllTransactionByCategory($date1, $date2, 'income', 100);
        $expense = $this->model->getAllTransactionByCategory($date1, $date2, 'expense', 100);

        return $this->createResponse([
            'income' => $income,
            'expense' => $expense
        ]);
    }

    public function getBiggestTransactionByCategory($dateRange)
    {
        if(strpos($dateRange, '_') !== false) {
            $date = explode('_', $dateRange);
            $date1 = $date[0];
            $date2 = $date[1];
        } else {
            $date1 = $dateRange;
            $date2 = $dateRange;
        }

        $response = $this->model->getAllTransactionByCategory($date1, $date2, 'expense', 5);
        $categoryName = array_column($response, 'category_name');
        $totalTransaction = array_column($response, 'total_transaksi');

        return $this->createResponse([
            'response'          => $response,
            'category'          => $categoryName,
            'totalTransaction'  => array_map('intval', $totalTransaction),
        ]);
    }

    public function getTotalIncomeExpense($dateRange)
    {
        if(strpos($dateRange, '_') !== false) {
            $date = explode('_', $dateRange);
            $date1 = $date[0];
            $date2 = $date[1];
        } else {
            $date1 = $dateRange;
            $date2 = $dateRange;
        }

        $response = $this->model->getTotalIncomeExpense($date1, $date2);
        $transformed = [
            'total_income' => 0, // Default value
            'total_expense' => 0, // Default value
            'net_income' => 0
        ];

        foreach ($response as $row) {
            if ($row->jenis_transaksi === 'income') {
                $transformed['total_income'] = plain_number_format($row->total);
            } elseif ($row->jenis_transaksi === 'expense') {
                $transformed['total_expense'] = plain_number_format($row->total);
            }
        }

        $totalIncome = str_replace(['Rp. ', '.'], '', $transformed['total_income']);
        $totalExpense = str_replace(['Rp. ', '.'], '', $transformed['total_expense']);
        $netIncome = $totalIncome - $totalExpense;

        $transformed['net_income'] = $netIncome < 0 ? plain_number_format($netIncome) : ($netIncome === 0 ? plain_number_format($netIncome) : '+' . plain_number_format($netIncome));

        return $this->createResponse($transformed);
    }
}