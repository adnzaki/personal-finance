<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ChangeTransactionDateFieldType extends Migration
{
    public function up()
    {
        $this->forge->modifyColumn('tb_transaksi', ['tgl_transaksi' => ['type' => 'datetime']]);
    }

    public function down()
    {
        //
    }
}
