<?php

namespace App\Controllers;

use App\Controllers\BaseController;

class Test extends BaseController
{
    public function listCommand()
    {
        echo command('migrate');
    }
}