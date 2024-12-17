<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddCategorySetting extends Migration
{
    public function up()
    {
        $this->db->table('tb_settings')->insert([
            'key' => 'hide_default_category',
            'value' => 1
        ]);
    }

    public function down()
    {
        //
    }
}
