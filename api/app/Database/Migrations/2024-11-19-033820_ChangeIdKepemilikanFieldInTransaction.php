<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ChangeIdKepemilikanFieldInTransaction extends Migration
{
    public function up()
    {
        $this->forge->dropForeignKey('tb_transaksi', 'tb_transaksi_id_kepemilikan_foreign');
        $this->forge->dropColumn('tb_transaksi', 'id_kepemilikan');
        $this->forge->addColumn('tb_transaksi', [
            'id_pemilik_sumber_dana' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'after' => 'id_sumber_dana'],
        ]);

        $this->forge->addForeignKey('id_pemilik_sumber_dana', 'tb_kepemilikan_sumber_dana', 'id', 'CASCADE', 'CASCADE');
        $this->forge->processIndexes('tb_transaksi');
    }

    public function down()
    {
        //
    }
}
