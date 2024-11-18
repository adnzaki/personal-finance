<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddCustomTransactionDate extends Migration
{
    public function up()
    {
        $this->forge->addColumn('tb_transaksi', [
            'tgl_transaksi' => [
                'type' => 'date',
                'null' => false,
                'after' => 'jenis_transaksi'
            ]
        ]);
    }

    public function down()
    {
        //
    }
}
