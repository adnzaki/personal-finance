<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddSubscription extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'user_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'plan' => [
                'type' => 'ENUM',
                'constraint' => ['trial', 'premium', 'pro'],
                'default' => 'trial',
            ],
            'status' => [
                'type' => 'ENUM',
                'constraint' => ['active', 'inactive', 'canceled'],
                'default' => 'active',
            ],
            'started_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'ended_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->addForeignKey('user_id', 'users', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('tb_langganan');
    }

    public function down()
    {
        //
    }
}
