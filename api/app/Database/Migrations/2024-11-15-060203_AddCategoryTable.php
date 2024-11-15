<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddCategoryTable extends Migration
{
    public function up()
    {
        $helper = new Helper;
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'category_name' => ['type' => 'VARCHAR', 'constraint' => 255],
            'category_type' => ['type' => 'ENUM', 'constraint' => ['income', 'expense']],
            'deleted' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'created' => ['type' => 'DATETIME', 'null' => true],
            'modified' => ['type' => 'DATETIME', 'null' => true],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->createTable('tb_kategori');
        $helper->fixCreatedAndModifiedField('tb_kategori');

        $this->forge->addColumn('tb_transaksi', [
            'id_kategori' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'after' => 'nominal']
        ]);

        $this->forge->addForeignKey('id_kategori', 'tb_kategori', 'id', '', 'CASCADE');
        $this->forge->processIndexes('tb_transaksi');
    }

    public function down()
    {
        $this->forge->dropColumn('tb_transaksi', 'id_kategori');
        $this->forge->dropTable('tb_kategori');
    }
}
