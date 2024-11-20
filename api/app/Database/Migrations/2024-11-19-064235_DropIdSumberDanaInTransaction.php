<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class DropIdSumberDanaInTransaction extends Migration
{
    public function up()
    {
        $this->forge->dropForeignKey('tb_transaksi', 'tb_transaksi_id_sumber_dana_foreign');
        $this->forge->dropColumn('tb_transaksi', 'id_sumber_dana');
    }

    public function down()
    {
        //
    }
}
