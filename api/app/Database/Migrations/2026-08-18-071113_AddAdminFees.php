<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddAdminFees extends Migration
{
    public function up()
    {
        $field = [
            'has_bea_admin' => [
                'type' => 'INT',
                'constraint' => 11,
                'default' => 0,
                'after' => 'pemilik_dana_tujuan',
            ],
            'parent_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'null' => true,
                'after' => 'has_bea_admin',
            ],
        ];
        $this->forge->addColumn('tb_transaksi', $field);
    }

    public function down()
    {
        //
    }
}
