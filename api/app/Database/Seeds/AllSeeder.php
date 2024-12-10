<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class AllSeeder extends Seeder
{
    public function run()
    {
        $this->call('CategorySeeder');
        $this->call('AddCategoryValues');
        $this->call('AddMoreCategories');
        $this->call('AddMoreCategories2');
    }
}
