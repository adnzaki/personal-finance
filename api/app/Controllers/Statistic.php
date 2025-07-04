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

        return $this->response->setJSON($balance);
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

        $income = $this->model->getAllTransactionByCategory($date1, $date2, 'income', 1000);
        $expense = $this->model->getAllTransactionByCategory($date1, $date2, 'expense', 1000);

        return $this->response->setJSON([
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

        $response = $this->model->getAllTransactionByCategory($date1, $date2, 'expense', 1000);
        $sliceResponse = array_slice($response, 0, 5);
        $otherTransactions = array_sum(array_column($response, 'total_transaksi')) - array_sum(array_column($sliceResponse, 'total_transaksi'));
        // now what about the percentage of the other transactions?
        $othersPercentage = $otherTransactions > 0 ? ($otherTransactions / array_sum(array_column($response, 'total_transaksi'))) * 100 : 0;

        $sliceResponse[] = (object)[
            'id_kategori'       => 'none',
            'category_name'     => 'Lain-lain',
            'total_transaksi'   => $otherTransactions,
            'total_nominal'     => idr_number_format($otherTransactions),
            'percentage'        => plain_number_format($othersPercentage, 2) . '%'
        ];

        $categoryName = array_column($sliceResponse, 'category_name');
        $totalTransaction = array_column($sliceResponse, 'total_transaksi');

        return $this->response->setJSON([
            'response'          => $sliceResponse,
            'category'          => $categoryName,
            'totalTransaction'  => array_map('intval', $totalTransaction),
        ]);
    }

    public function getTotalIncomeExpense($dateRange, $fundId = null)
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

        return $this->response->setJSON($transformed);
    }
}