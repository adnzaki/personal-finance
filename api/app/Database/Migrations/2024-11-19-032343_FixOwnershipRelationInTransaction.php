<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class FixOwnershipRelationInTransaction extends Migration
{
    public function up()
    {
        $this->forge->dropForeignKey('tb_transaksi', 'tb_transaksi_id_kepemilikan_foreign');
        $this->forge->addForeignKey('id_kepemilikan', 'tb_kepemilikan_sumber_dana', 'id', 'CASCADE', 'CASCADE');
        $this->forge->processIndexes('tb_transaksi');
    }

    public function down()
    {
        //
    }
}
