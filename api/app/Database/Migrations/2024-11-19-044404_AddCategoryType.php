<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddCategoryType extends Migration
{
    public function up()
    {
        $this->forge->modifyColumn('tb_kategori', [
            'category_type' => [
                'type' => 'ENUM',
                'constraint' => ['income', 'expense', 'transfer'],
            ]
        ]);
    }

    public function down()
    {
        //
    }
}
