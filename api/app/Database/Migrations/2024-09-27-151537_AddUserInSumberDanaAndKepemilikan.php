<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddUserInSumberDanaAndKepemilikan extends Migration
{
    public function up()
    {
        $helper = new Helper;
        $fields = [
            'user_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'after' => 'id',
                'null' => true,
            ],
        ];
        $this->db->enableForeignKeyChecks();
        $this->forge->addColumn('tb_sumber_dana', $fields);
        $this->forge->addForeignKey('user_id', 'users', 'id', '', 'CASCADE');
        $this->forge->addColumn('tb_kepemilikan_dana', $fields);
        $this->forge->addForeignKey('user_id', 'users', 'id', '', 'CASCADE');
    }

    public function down()
    {
        //
    }
}
