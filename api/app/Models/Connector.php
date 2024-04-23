<?php namespace App\Models;

/**
 * Main database connection class.
 * Each model class should extend this class
 * in order to make all database-related task to run
 * 
 * @author    : Adnan Zaki
 * @since     : 2024-04-05
 * 
 * @method \CodeIgniter\Database\BaseResult getNumRows()
 */
class Connector
{
    /**
     * @var \CodeIgniter\Database\BaseConnection
     */
    public $db;

    /**
     * @var string
     */
    protected $sumberDana = 'tb_sumber_dana';

    /**
     * @var string
     */
    protected $pendapatan = 'tb_pendapatan';

    /**
     * @var string
     */
    protected $kepemilikan = 'tb_kepemilikan_dana';

    /**
     * @var string
     */
    protected $transaksi = 'tb_transaksi';


    public function __construct()
    {
        $this->db = db_connect();
    }
}