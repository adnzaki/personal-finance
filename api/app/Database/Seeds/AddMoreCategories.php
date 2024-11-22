<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AddMoreCategories extends Seeder
{
    public function run()
    {
        $data = [
            // Income Categories
            ['category_name' => 'Royalti', 'category_type' => 'income'],
            ['category_name' => 'Dividen', 'category_type' => 'income'],
            ['category_name' => 'Ekstra', 'category_type' => 'income'],
            ['category_name' => 'Bantuan', 'category_type' => 'income'],
            ['category_name' => 'Refund', 'category_type' => 'income'],
            ['category_name' => 'Tips', 'category_type' => 'income'], // Kategori diminta
            ['category_name' => 'Freelance', 'category_type' => 'income'], // Kategori diminta
            ['category_name' => 'Kemitraan', 'category_type' => 'income'],

            // Expense Categories
            ['category_name' => 'Kendaraan', 'category_type' => 'expense'],
            ['category_name' => 'Langganan', 'category_type' => 'expense'],
            ['category_name' => 'Internet', 'category_type' => 'expense'],
            ['category_name' => 'Keperluan Rumah', 'category_type' => 'expense'], // Kategori diminta
            ['category_name' => 'Keperluan Kantor', 'category_type' => 'expense'], // Kategori diminta
            ['category_name' => 'Properti', 'category_type' => 'expense'],
            ['category_name' => 'Perjalanan', 'category_type' => 'expense'],
            ['category_name' => 'Sosial', 'category_type' => 'expense']
        ];

        $this->db->table('tb_kategori')->insertBatch($data);
    }
}
