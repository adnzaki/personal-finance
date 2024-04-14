<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class InitialTables extends Migration
{
    public function up()
    {
        $helper = new Helper;

        // tb_sumber_dana
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'nama' => ['type' => 'VARCHAR', 'constraint' => 255],
            'jumlah' => ['type' => 'BIGINT'],
            'deleted' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'created' => ['type' => 'DATETIME', 'null' => true],
            'modified' => ['type' => 'DATETIME', 'null' => true],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('tb_sumber_dana');
        $helper->fixCreatedAndModifiedField('tb_sumber_dana');

        // tb_kepemilikan_dana
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'kepemilikan' => [ 'type' => 'VARCHAR', 'constraint' => 255],
            'deleted' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'created' => ['type' => 'DATETIME', 'null' => true],
            'modified' => ['type' => 'DATETIME', 'null' => true],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('tb_kepemilikan_dana');
        $helper->fixCreatedAndModifiedField('tb_kepemilikan_dana');

        // tb_kepemilikan_sumber_dana
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'id_sumber_dana' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
            'id_kepemilikan' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
            'deleted' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'created' => ['type' => 'DATETIME', 'null' => true],
            'modified' => ['type' => 'DATETIME', 'null' => true],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('id_sumber_dana', 'tb_sumber_dana', 'id', '', 'CASCADE');
        $this->forge->addForeignKey('id_kepemilikan', 'tb_kepemilikan_dana', 'id', '', 'CASCADE');
        $this->forge->createTable('tb_kepemilikan_sumber_dana');
        $helper->fixCreatedAndModifiedField('tb_kepemilikan_sumber_dana');

        // tb_transaksi
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'id_sumber_dana' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
            'id_kepemilikan' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
            'jenis_transaksi' => ['type' => 'ENUM', 'constraint' => ['income', 'expense']],
            'deskripsi' => ['type' => 'VARCHAR', 'constraint' => 255],
            'nominal' => ['type' => 'BIGINT'],
            'deleted' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'created' => ['type' => 'DATETIME', 'null' => true],
            'modified' => ['type' => 'DATETIME', 'null' => true],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('id_sumber_dana', 'tb_sumber_dana', 'id', 'CASCADE', 'CASCADE');
        $this->forge->addForeignKey('id_kepemilikan', 'tb_kepemilikan_dana', 'id', 'CASCADE', 'CASCADE');
        $this->forge->createTable('tb_transaksi');
        $helper->fixCreatedAndModifiedField('tb_transaksi');
    }

    public function down()
    {
        $helper = new Helper;
        $helper->db->disableForeignKeyChecks();

        $this->forge->dropTable('tb_kepemilikan_sumber_dana');
        $this->forge->dropTable('tb_transaksi');
        $this->forge->dropTable('tb_kepemilikan_dana');        
        $this->forge->dropTable('tb_sumber_dana');
        
        $helper->db->enableForeignKeyChecks();
    }
}
