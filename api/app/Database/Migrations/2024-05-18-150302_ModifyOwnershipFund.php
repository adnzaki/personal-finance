<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class ModifyOwnershipFund extends Migration
{
    public function up()
    {
        $this->forge->addColumn('tb_kepemilikan_sumber_dana', [
            'jumlah_dana' => ['type' => 'bigint', 'after' => 'id_kepemilikan']
        ]);

        $this->forge->dropColumn('tb_sumber_dana', 'jumlah');
    }

    public function down()
    {
        //
    }
}
