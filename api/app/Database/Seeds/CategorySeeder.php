<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'category_name' => 'Gaji',
                'category_type' => 'income',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Bonus',
                'category_type' => 'income',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Investasi',
                'category_type' => 'income',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Hadiah',
                'category_type' => 'income',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Penjualan Barang',
                'category_type' => 'income',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Tagihan',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Sewa',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Listrik',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Air',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Transportasi',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Makan dan Minum',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Pendidikan',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Hiburan',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Asuransi',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Kesehatan',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Pajak',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Donasi',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'category_name' => 'Belanja Harian',
                'category_type' => 'expense',
                'deleted' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
        ];

        $this->db->table('tb_kategori')->insertBatch($data);
    }
}
