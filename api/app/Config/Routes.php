<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->add('validate-page', 'Auth::validatePageRequest');
$routes->post('validate-login', 'Auth::validateLogin');
$routes->add('logout-user', 'Auth::logout');
$routes->add('delete-default-cookie', 'Auth::deleteDefaultCookie');
$routes->add('signup', 'Registration::signup');
$routes->group('ownership', function (RouteCollection $routes) {
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)', 'Ownership::getData/$1/$2/$3/$4/$5');
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Ownership::getData/$1/$2/$3/$4/$5/$6');
    $routes->add('save', 'Ownership::save');
    $routes->add('save/(:any)', 'Ownership::save/$1');
    $routes->add('detail/(:any)', 'Ownership::getDetail/$1');
    $routes->add('delete/(:any)', 'Ownership::delete/$1');
});

$routes->group('fund', function (RouteCollection $routes) {
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)', 'Fund::getData/$1/$2/$3/$4/$5');
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Fund::getData/$1/$2/$3/$4/$5/$6');
    $routes->add('get-pemilik', 'Fund::getPemilik');
    $routes->add('save', 'Fund::save');
    $routes->add('save/(:any)', 'Fund::save/$1');    
    $routes->add('detail/(:any)', 'Fund::getDetail/$1');
    $routes->add('delete/(:any)', 'Fund::delete/$1');
});

$routes->group('category', function (RouteCollection $routes) {
    $routes->add('save', 'Category::save');
    $routes->add('save/(:any)', 'Category::save/$1');
    $routes->add('update-default-visibility', 'Category::updateDefaultCategoryVisibility');
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)', 'Category::getData/$1/$2/$3/$4/$5');
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Category::getData/$1/$2/$3/$4/$5/$6');
    $routes->add('get-default-category-setting', 'Category::getDefaultCategorySetting');
    $routes->add('detail/(:num)', 'Category::getDetail/$1');
    $routes->add('delete/(:any)', 'Category::delete/$1');
});

$routes->group('transaction', function (RouteCollection $routes) {
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)', 'Transaction::getData/$1/$2/$3/$4/$5');
    $routes->add('get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Transaction::getData/$1/$2/$3/$4/$5/$6');
    $routes->add('get-fund-source', 'Transaction::getFundSource');
    $routes->add('get-target-funds/(:any)', 'Transaction::getTargetFunds/$1');
    $routes->add('get-owner-by-fund-id/(:any)', 'Transaction::getOwnerByFundId/$1');
    $routes->add('get-owner-by-fund-id/(:any)/(:any)', 'Transaction::getOwnerByFundId/$1/$2');
    $routes->add('get-categories/(:alpha)', 'Transaction::getCategories/$1');
    $routes->add('save', 'Transaction::save');
    $routes->add('save/(:any)', 'Transaction::save/$1');    
    $routes->add('detail/(:any)', 'Transaction::getDetail/$1');
    $routes->add('delete/(:any)', 'Transaction::delete/$1');
});

$routes->group('statistic', function (RouteCollection $routes) {
    $routes->add('get-total-income-expense/(:any)', 'Statistic::getTotalIncomeExpense/$1');
    $routes->add('get-total-income-expense/(:any)/(:any)', 'Statistic::getTotalIncomeExpense/$1/$2');
    $routes->add('get-biggest-transaction-by-category/(:any)', 'Statistic::getBiggestTransactionByCategory/$1');
    $routes->add('get-biggest-transaction-by-category/(:any)/(:any)', 'Statistic::getBiggestTransactionByCategory/$1/$2');
    $routes->add('get-all-transaction-by-category/(:any)', 'Statistic::getAllTransactionByCategory/$1');
    $routes->add('get-all-transaction-by-category/(:any)/(:any)', 'Statistic::getAllTransactionByCategory/$1/$2');
    $routes->add('get-total-balance/(:any)', 'Statistic::getTotalBalance/$1');
    $routes->add('get-total-balance/(:any)/(:any)', 'Statistic::getTotalBalance/$1/$2');
    $routes->add('get-owners', 'Statistic::getOwners'); 
});

$routes->group('user', function (RouteCollection $routes) {
    $routes->post('create', 'UserManager::createUser');
    $routes->post('update', 'UserManager::updateUser');
    $routes->post('update/(:any)', 'UserManager::updateUser/$1');
    $routes->post('delete', 'UserManager::deleteUser');
});

$routes->group('settings', function (RouteCollection $routes) {
    $routes->add('update-password', 'Auth::updatePassword');
});

$routes->group('dashboard', function (RouteCollection $routes) {
    $routes->add('get-biggest-funds', 'Dashboard::getBiggestFunds');
    $routes->add('get-transaction-by-category', 'Dashboard::getTransactionByCategory');
});

$routes->group('report', function (RouteCollection $routes) {
    $routes->add('general-cash/(:any)', 'Report::generalCashReport/$1');
    $routes->add('general-cash/(:any)/(:any)', 'Report::generalCashReport/$1/$2');
});

$routes->add('run-command', 'CommandRunner::runCommand');

$routes->group('test', function (RouteCollection $routes) {
    $routes->add('list-command', 'Test::listCommand');
});

service('auth')->routes($routes);
