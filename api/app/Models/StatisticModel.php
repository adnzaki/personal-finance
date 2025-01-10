<?php

namespace App\Models;

use App\Models\TransactionModel;
use App\Models\CategoryModel;
use App\Models\FundModel;

class StatisticModel extends TransactionModel
{
    public function getTotalBalance(string $dateRange)
    {
        $fund = new FundModel();
        $limit = $fund->getTotalRows();
        $data = $fund->getData($limit, 0);
        foreach ($data as $d) {
            $balance = array_sum(array_column($fund->getTotalFund($d->id), 'jumlah_dana'));
            $d->balance = $balance ?? 0;
        }

        $totalBalance = array_sum(array_column($data, 'balance'));

        // split the $dateRange first if it contains '_'
        // otherwise, do not split $dateRange
        if (strpos($dateRange, '_') !== false) {
            $date = explode('_', $dateRange);
            $startDate = date('Y-m-d', strtotime($date[0]));
            $endDate = date('Y-m-d', strtotime($date[1]) + 86400);
            $startDateRange = $startDate . '_2999-12-31';
            $endDateRange = $endDate . '_2999-12-31';

            // it is just a helper for us, not for users
            $endDateLong = date('Y-m-d H:i:s', strtotime($date[1]) + 86400);
        } else {
            $startDate = date('Y-m-d', strtotime($dateRange));
            $startDateRange = $startDate . '_2999-12-31';
            $endDateRange = $startDate . '_2999-12-31';
            $endDateLong = date('Y-m-d H:i:s', strtotime($dateRange) + 86400);
        }

        // now get the transactions that will be excluded from the total balance
        // and separate between income and expense
        $incomeTransactionsStart = $this->getData('all', 'all', 'income', 'all', $startDateRange, $limit, 0);
        $expenseTransactionsStart = $this->getData('all', 'all', 'expense', 'all', $startDateRange, $limit, 0);
        $totalIncomeTransactionsStart = array_sum(array_column($incomeTransactionsStart, 'nominal'));
        $totalExpenseTransactionsStart = array_sum(array_column($expenseTransactionsStart, 'nominal'));

        // now here is the Start Balance!
        $startBalance = $totalBalance + $totalExpenseTransactionsStart - $totalIncomeTransactionsStart;

        // now let's calculate the ending balance
        $incomeTransactionsEnd = $this->getData('all', 'all', 'income', 'all', $endDateRange, $limit, 0);
        $expenseTransactionsEnd = $this->getData('all', 'all', 'expense', 'all', $endDateRange, $limit, 0);
        $totalIncomeTransactionsEnd = array_sum(array_column($incomeTransactionsEnd, 'nominal'));
        $totalExpenseTransactionsEnd = array_sum(array_column($expenseTransactionsEnd, 'nominal'));
        $endBalance = $totalBalance - $totalIncomeTransactionsEnd + $totalExpenseTransactionsEnd;

        return [
            'total_balance'     => idr_number_format($totalBalance),
            'start_balance'     => idr_number_format($startBalance),
            'end_balance'       => idr_number_format($endBalance),
            'income_start'      => idr_number_format($totalIncomeTransactionsStart),
            'expense_start'     => idr_number_format($totalExpenseTransactionsStart),
            'net_income'        => idr_number_format($totalIncomeTransactionsStart - $totalExpenseTransactionsStart),
            'income_end'        => idr_number_format($totalIncomeTransactionsEnd),
            'expense_end'       => idr_number_format($totalExpenseTransactionsEnd),
            'end_date'          => $endDateRange,
            'end_date_long'     => $endDateLong,
        ];
    }

    public function getTotalIncomeExpense(string $date1, string $date2)
    {
        $field = 'jenis_transaksi, SUM(nominal) as total';
        $select = $this->builder->select($field);
        $select->join($this->pemilikSumberDana, $this->pemilikSumberDana . '.id = ' . $this->transaksi . '.id_pemilik_sumber_dana')
            ->join($this->sumberDana, $this->sumberDana . '.id = ' . $this->pemilikSumberDana . '.id_sumber_dana');
        $select->where($this->defaultFilter);
        $select->where([
            'tgl_transaksi >= ' => $date1 . ' 00:00:00',
            'tgl_transaksi <= ' => $date2 . ' 23:59:59'
        ]);

        return $select->groupBy('jenis_transaksi')->get()->getResult();
    }

    public function getAllTransactionByCategory(string $date1, string $date2, string $categoryType, int $limit)
    {
        $categoryModel = new CategoryModel();

        $select = "id_kategori, category_name, SUM(nominal) as total_transaksi, CONCAT('Rp. ', REPLACE(FORMAT(SUM(nominal), 0), ',', '.')) AS total_nominal";
        $query = $this->builder->select($select)
            ->join($this->pemilikSumberDana, $this->pemilikSumberDana . '.id = ' . $this->transaksi . '.id_pemilik_sumber_dana')
            ->join($this->sumberDana, $this->sumberDana . '.id = ' . $this->pemilikSumberDana . '.id_sumber_dana')
            ->join($this->kategori, $this->kategori . '.id = ' . $this->transaksi . '.id_kategori')
            ->join($this->kepemilikan, $this->kepemilikan . '.id = ' . $this->pemilikSumberDana . '.id_kepemilikan')
            ->where('jenis_transaksi', $categoryType)
            ->where($this->defaultFilter)
            ->where([
                "{$this->transaksi}.deleted"    => 0,
                "{$this->kategori}.deleted"     => 0,
            ])
            ->whereIn("{$this->kategori}.user_id", [$categoryModel->defaultUserCategory, auth()->id()])
            ->where([
                'tgl_transaksi >= ' => $date1 . ' 00:00:00',
                'tgl_transaksi <= ' => $date2 . ' 23:59:59'
            ])
            ->groupBy('id_kategori')
            ->orderBy('total_transaksi', 'DESC')
            ->limit($limit)
            ->get();

        $results = $query->getResult();
        $totalExpense = array_sum(array_column($results, 'total_transaksi'));

        foreach ($results as &$result) {
            $result->percentage = $totalExpense > 0 ? number_format(($result->total_transaksi / $totalExpense) * 100, 2, ',', '.') . '%' : '0,00%';
        }

        return $results;
    }
}
