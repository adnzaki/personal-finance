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
    protected $pemilikSumberDana = 'tb_kepemilikan_sumber_dana';

    /**
     * @var string
     */
    protected $kepemilikan = 'tb_kepemilikan_dana';

    /**
     * @var string
     */
    protected $transaksi = 'tb_transaksi';

    /**
     * @var string
     */
    protected $kategori = 'tb_kategori_user';

    /**
     * @var string
     */
    protected $settings = 'tb_settings';

    /**
     * @var array
     */
    protected $basicFilter = [];

    protected $settingBuilder;


    public function __construct()
    {
        $this->db = db_connect();
        $this->basicFilter = ['deleted' => 0, 'user_id' => auth()->id()];
        $this->settingBuilder = $this->db->table($this->settings);
    }
}