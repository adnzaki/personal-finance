<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;
use App\Models\UserModel;

class AddSelfManagedCategories extends Migration
{
    public function up()
    {
        $helper = new Helper;
        $user = new UserModel;

        $username = 'default_category';
        $user->create([
            'username' => $username,
            'email' => $username . '@sisa-uang.com',
            'password' => env('dev_password'),
        ]);

        $userId = auth()->getProvider()->findByCredentials(['email' => $username . '@sisa-uang.com'])->id;

        $table = 'tb_kategori_user';
        $this->forge->addField([
            'id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true, 'auto_increment' => true],
            'user_id' => ['type' => 'INT', 'constraint' => 11, 'unsigned' => true],
            'category_name' => ['type' => 'VARCHAR', 'constraint' => 255],
            'category_type' => ['type' => 'ENUM', 'constraint' => ['income', 'expense', 'transfer']],
            'deleted' => ['type' => 'TINYINT', 'constraint' => 1, 'default' => 0],
            'created' => ['type' => 'DATETIME', 'null' => true],
            'modified' => ['type' => 'DATETIME', 'null' => true],
        ]);

        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('user_id', 'users', 'id', '', 'CASCADE');
        $this->forge->createTable($table);
        $helper->fixCreatedAndModifiedField($table);

        // Copy data dari tb_kategori ke tb_kategori_user
        $this->db->query("
            INSERT INTO tb_kategori_user (id, user_id, category_name, category_type, deleted, created, modified)
            SELECT 
                id, 
                $userId AS user_id, 
                category_name, 
                category_type, 
                deleted, 
                created, 
                modified
            FROM tb_kategori
        ");

        $this->forge->dropForeignKey('tb_transaksi', 'tb_transaksi_id_kategori_foreign');
        $this->forge->dropKey('tb_transaksi', 'tb_transaksi_id_kategori_foreign');

        $this->forge->addForeignKey('id_kategori', $table, 'id');
        $this->forge->processIndexes('tb_transaksi');
    }

    public function down()
    {
        //
    }
}
