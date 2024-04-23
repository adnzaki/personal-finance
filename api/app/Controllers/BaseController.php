<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\CLIRequest;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Psr\Log\LoggerInterface;

/**
 * Class BaseController
 *
 * BaseController provides a convenient place for loading components
 * and performing functions that are needed by all your controllers.
 * Extend this class in any new controllers:
 *     class Home extends BaseController
 *
 * For security be sure to declare any new methods as protected or private.
 */
abstract class BaseController extends Controller
{
    /**
     * Instance of the main Request object.
     *
     * @var CLIRequest|IncomingRequest
     */
    protected $request;

    /**
     * An array of helpers to be loaded automatically upon
     * class instantiation. These helpers will be available
     * to all other controllers that extend BaseController.
     *
     * @var list<string>
     */
    protected $helpers = ['sisauang'];

    /**
     * Be sure to declare properties for any property fetch you initialized.
     * The creation of dynamic property is deprecated in PHP 8.2.
     */
    // protected $session;

    /**
     * HTTP Status
     * 
     * @var string
     */
    protected $status = [
        112 => 'Service expired',
        113 => 'Subscription valid',
        200 => 'Token validated.',
        500 => 'Internal Server Error',
        503 => 'Unauthorized Access'
    ];

    /**
     * Validation common messages
     * 
     * @var array
     */
    protected $messages = [
        'required'          => 'Kolom {field} wajib diisi',
        'required_fill'     => 'Silakan isi {field} terlebih dahulu',
        'required_select'   => 'Silakan pilih  {field} terlebih dahulu',
        'numeric'           => 'Kolom {field} hanya boleh diisi angka',
        'min_length'        => 'Kolom {field} harus berisi setidaknya {param} karakter',
        'max_length'        => 'Kolom {field} tidak boleh lebih dari {param} karakter',
        'exact_length'      => 'Kolom {field} hanya boleh diisi dengan {param} karakter',
        'in_list'           => 'Pilhan {field} tidak tersedia',
        'valid_url'         => 'Kolom {field} harus berisi URL yang valid. (Contoh: http://example.com / https://example2.com)',
        'valid_email'       => 'Kolom {field} harus berisi alamat email yang valid',
        'is_unique'         => 'Username telah digunakan',
        'is_unique_email'   => 'Alamat email telah digunakan',
        'max_size'          => 'Ukuran file terlalu besar.',
        'alpha_dash'        => 'Kolom {field} hanya boleh diisi huruf, angka, underscore(_) dan strip (-).',
        'matches'           => 'Kolom {field} harus sama dengan kolom {param}'
    ];

    /**
     * @return void
     */
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger)
    {
        // Do Not Edit This Line
        parent::initController($request, $response, $logger);

        // Preload any models, libraries, etc, here.

        // E.g.: $this->session = \Config\Services::session();
    }

    protected function createResponse($response)
    {
        if(valid_access()) {
            return $this->response->setJSON($response);
        } else {
            return $this->response->setJSON($this->setStatus(503));
        }
    }

    protected function setStatus($code)
    {
        return [
            'status'    => $code,
            'msg'       => $this->status[$code]
        ];
    }
}
