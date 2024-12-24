<?php

// buat sebuah fungsi dengan nama idr_number_format
if (!function_exists('idr_number_format')) {
    function idr_number_format($number, $decimals = 0)
    {
        return $number > 0 ? 'Rp. ' . number_format($number, $decimals, ',', '.') : 'Rp. -';
    }
}

if (!function_exists('plain_number_format')) {
    function plain_number_format($number, $decimals = 0)
    {
        return $number === 0 ? '-' : number_format($number, $decimals, ',', '.');
    }
}

if (!function_exists('os_date')) {
    function os_date()
    {
        return new \OstiumDate();
    }
}

if(! function_exists('valid_access')) {
    function valid_access()
    {
        $result = auth()->attempt([
            'token' => get_client_token(),
        ]);

        return $result->isOK();
    }
}

if(! function_exists('get_client_token')) {
    function get_client_token()
    {
        $request = \Config\Services::request();

        return $request->getHeaderLine(setting('Auth.authenticatorHeader')['tokens'] ?? 'Authorization');
    }
}