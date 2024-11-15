<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTransactionType extends Migration
{
    public function up()
    {
        $this->forge->modifyColumn('tb_transaksi', [
            'jenis_transaksi' => ['type' => 'ENUM', 'constraint' => ['income', 'expense', 'transfer']]
        ]);
    }

    public function down()
    {
        //
    }
}
