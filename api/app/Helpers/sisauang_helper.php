<?php

use CodeIgniter\Shield\Authentication\Authenticators\AccessTokens;
use App\Models\SubscriptionModel;

if(! function_exists('alphabet_numbering')) {

    /**
     * Returns the alphabet letter corresponding to the given index.
     * Example: alphabet_numbering(1) returns 'A', alphabet_numbering(2) returns 'B', etc.
     * @param int $index The index of the alphabet letter to return.
     * @return string The alphabet letter corresponding to the given index.
     */
    function alphabet_numbering(int $index, $case = 'lower')
    {
        $alphabet = range('A', 'Z');
        return $case === 'lower' ? strtolower($alphabet[$index - 1]) : $alphabet[$index - 1];
    }
}

if(! function_exists('valid_subscription')) {
    function valid_subcscription($userId)
    {
        $subscriptionModel = new SubscriptionModel;
        $checkActivation = $subscriptionModel->checkActivation($userId);
        $checkActivePeriod = $subscriptionModel->checkActivePeriod($userId);
        $subscription = $subscriptionModel->hasSubscription($userId);

        return $subscription && $checkActivation && $checkActivePeriod;
    }
}

if (! function_exists('request')) {
    /**
     * Shortcut to CodeIgniter request object
     * 
     * @return \CodeIgniter\HTTP\IncomingRequest
     */
    function request()
    {
        return service('request');
    }
}

if (! function_exists('encrypt')) {
    /**
     * Encrypt IDs with openssl encryption and base64 encoding
     * 
     * @param string $id The ID to encrypt
     * @param string $key The encryption key
     * 
     * @return string
     */
    function encrypt($id, $key)
    {
        $cipher = "AES-256-CBC";
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($cipher));
        $encrypted = openssl_encrypt($id, $cipher, $key, 0, $iv);
        $data = base64_encode($iv . $encrypted);

        // Ubah ke format URL-safe
        return rtrim(strtr($data, '+/', '-_'), '=');
    }
}

if (! function_exists('decrypt')) {
    /**
     * Decript IDs that is encrypted with openssl encryption and base64 encoding
     * 
     * @param string $id The ID to decrypt
     * @param string $key The encryption key
     * 
     * @return string|false The encrypted ID or false if it is invalid
     */
    function decrypt($encryptedData, $key)
    {
        $cipher = "AES-256-CBC";

        // Kembalikan ke base64 normal
        $data = strtr($encryptedData, '-_', '+/');
        $data = base64_decode($data);

        $ivLength = openssl_cipher_iv_length($cipher);
        $iv = substr($data, 0, $ivLength);
        $encrypted = substr($data, $ivLength);

        return openssl_decrypt($encrypted, $cipher, $key, 0, $iv);
    }
}

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
    /**
     * Return a new instance of \OstiumDate.
     *
     * @return \OstiumDate
     */
    function os_date()
    {
        return new \OstiumDate();
    }
}

if(! function_exists('valid_access')) {
    function valid_access($token = null)
    {
        /** @var AccessTokens $authenticator */
        $authenticator = auth('tokens')->getAuthenticator();
        $result = $authenticator->attempt([
            'token' => $token ?? get_client_token(),
        ]);

        return [
            'valid' => $result->isOK(),
            'user'  => $result->isOK() ? $authenticator->getUser() : null
        ];
    }
}

if(! function_exists('get_client_token')) {
    function get_client_token()
    {
        $request = \Config\Services::request();

        return $request->getHeaderLine(setting('Auth.authenticatorHeader')['tokens'] ?? 'Authorization');
    }
}