<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AddCategoryValues extends Seeder
{
    public function run()
    {
        $data = [
            [
                'category_name' => 'Transfer Saldo',
                'category_type' => 'transfer',
            ],
        ];

        $this->db->table('tb_kategori')->insertBatch($data);
    }
}
