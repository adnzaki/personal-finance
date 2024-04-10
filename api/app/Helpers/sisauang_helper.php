<?php

if(! function_exists('valid_access')) {
    function valid_access()
    {
        $authenticator = auth('tokens')->getAuthenticator();
        $request = \Config\Services::request();

        $result = $authenticator->attempt([
            'token' => $request->getHeaderLine(setting('Auth.authenticatorHeader')['tokens'] ?? 'Authorization'),
        ]);

        return $result->isOK();
    }
}