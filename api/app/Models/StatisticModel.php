<?php

namespace App\Models;
use App\Models\TransactionModel;
use App\Models\CategoryModel;

class StatisticModel extends TransactionModel
{
    public function getTotalIncomeExpense($date1, $date2)
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

    public function getBiggestTransactionByCategory($date1, $date2) 
    {
        $categoryModel = new CategoryModel();

        $select = "id_kategori, category_name, SUM(nominal) as total_transaksi, CONCAT('Rp. ', REPLACE(FORMAT(SUM(nominal), 0), ',', '.')) AS total_nominal";
        $query = $this->builder->select($select)
                               ->join($this->kategori, $this->kategori . '.id = ' . $this->transaksi . '.id_kategori')
                               ->where('jenis_transaksi', 'expense')
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
                               ->limit(5)
                               ->get();

        return $query->getResult();
    }
}