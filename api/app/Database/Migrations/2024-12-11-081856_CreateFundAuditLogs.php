<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateFundAuditLogs extends Migration
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
            'fund_owner_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
            ],
            'previous_balance' => [
                'type' => 'bigint',
                'null' => false,
            ],
            'new_balance' => [
                'type' => 'BIGINT',
                'null' => false,
            ],
            'amount' => [
                'type' => 'BIGINT',
                'null' => false,
            ],
            'transaction_id' => [
                'type' => 'INT',
                'constraint' => 11,
                'null' => true,
            ],
            'note' => [
                'type' => 'TEXT',
                'null' => true,
            ],
            'timestamp' => [
                'type' => 'DATETIME',
                'null' => false,
            ],
        ]);

        // Define primary key
        $this->forge->addKey('id', true);

        // Define foreign key for fund_owner_id (optional)
        $this->forge->addForeignKey('fund_owner_id', 'tb_kepemilikan_sumber_dana', 'id', 'CASCADE', 'CASCADE');

        // Create the table
        $this->forge->createTable('fund_audit_logs', true);
    }

    public function down()
    {
        //
    }
}
