<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AddMoreCategories2 extends Seeder
{
    public function run()
    {
        $data = [
            // Income Categories
            ['category_name' => 'Penyesuaian Saldo', 'category_type' => 'income'],
            ['category_name' => 'Penerimaan Pinjaman', 'category_type' => 'income'],
            ['category_name' => 'Pengembalian Pinjaman', 'category_type' => 'income'],
            ['category_name' => 'Pekerjaan Sampingan', 'category_type' => 'income'],

            // Expense Categories
            ['category_name' => 'Penyesuaian Saldo', 'category_type' => 'expense'],
            ['category_name' => 'Pemberian Hutang', 'category_type' => 'expense'],
            ['category_name' => 'Pembayaran Hutang', 'category_type' => 'expense'],
            ['category_name' => 'Parkir', 'category_type' => 'expense'],
            ['category_name' => 'Gadget & Teknologi', 'category_type' => 'expense'],
        ];

        $this->db->table('tb_kategori')->insertBatch($data);
    }
}
