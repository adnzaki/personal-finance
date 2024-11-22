<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->add('validate-page', 'Auth::validatePageRequest');
$routes->post('validate-login', 'Auth::validateLogin');
$routes->add('logout-user', 'Auth::logout');
$routes->group('ownership', function ($routes) {
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)', 'Ownership::getData/$1/$2/$3/$4/$5');
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Ownership::getData/$1/$2/$3/$4/$5/$6');
    $routes->add('save', 'Ownership::save');
    $routes->add('save/(:any)', 'Ownership::save/$1');
    $routes->add('detail/(:any)', 'Ownership::getDetail/$1');
    $routes->add('delete/(:any)', 'Ownership::delete/$1');
});

$routes->group('fund', function ($routes) {
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)', 'Fund::getData/$1/$2/$3/$4/$5');
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Fund::getData/$1/$2/$3/$4/$5/$6');
    $routes->add('get-pemilik', 'Fund::getPemilik');
    $routes->add('save', 'Fund::save');
    $routes->add('save/(:any)', 'Fund::save/$1');    
    $routes->add('detail/(:any)', 'Fund::getDetail/$1');
    $routes->add('delete/(:any)', 'Fund::delete/$1');
});

$routes->group('transaction', function ($routes) {
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Transaction::getData/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10');
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Transaction::getData/$1/$2/$3/$4/$5/$6/$7/$8/$9/$10/$11');
    $routes->add('get-fund-source', 'Transaction::getFundSource');
    $routes->add('get-target-funds/(:any)', 'Transaction::getTargetFunds/$1');
    $routes->add('get-owner-by-fund-id/(:any)', 'Transaction::getOwnerByFundId/$1');
    $routes->add('get-categories/(:alpha)', 'Transaction::getCategories/$1');
    $routes->add('save', 'Transaction::save');
    $routes->add('save/(:any)', 'Transaction::save/$1');    
    $routes->add('detail/(:any)', 'Transaction::getDetail/$1');
    $routes->add('delete/(:any)', 'Transaction::delete/$1');
});

$routes->group('user', function ($routes) {
    $routes->post('create', 'UserManager::createUser');
    $routes->post('update', 'UserManager::updateUser');
    $routes->post('delete', 'UserManager::deleteUser');
});

$routes->add('run-command', 'CommandRunner::runCommand');

$routes->group('test', function ($routes) {
    $routes->add('list-command', 'Test::listCommand');
});

service('auth')->routes($routes);
