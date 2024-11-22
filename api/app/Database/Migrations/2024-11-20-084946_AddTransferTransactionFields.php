<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTransferTransactionFields extends Migration
{
    public function up()
    {
        $this->forge->addColumn('tb_transaksi', [
            'sumber_dana_tujuan' => [
                'type' => 'INT',
                'constraint' => 11,
                'null' => true,
                'after' => 'id_kategori',
            ],
            'pemilik_dana_tujuan' => [
                'type' => 'INT',
                'constraint' => 11,
                'null' => true,
                'after' => 'sumber_dana_tujuan',
            ],
        ]);
    }

    public function down()
    {
        //
    }
}
