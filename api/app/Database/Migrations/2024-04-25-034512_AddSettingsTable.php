<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddSettingsTable extends Migration
{
    public function up()
    {
        $helper = new Helper;
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'key' => ['type' => 'VARCHAR', 'constraint' => 255],
            'value' => ['type' => 'VARCHAR', 'constraint' => 255],
            'deleted' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'created' => ['type' => 'DATETIME', 'null' => true],
            'modified' => ['type' => 'DATETIME', 'null' => true],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('tb_settings');
        $helper->fixCreatedAndModifiedField('tb_settings');
    }

    public function down()
    {
        //
    }
}
