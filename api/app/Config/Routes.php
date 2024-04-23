<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->add('validate-page', 'Auth::validatePageRequest');
$routes->post('validate-login', 'Auth::validateLogin');
$routes->add('logout-user', 'Auth::logout');
$routes->add('ownership/get-data/(:any)/(:any)/(:any)/(:any)/(:any)', 'Ownership::getData/$1/$2/$3/$4/$5');
$routes->add('ownership/get-data/(:any)/(:any)/(:any)/(:any)/(:any)/(:any)', 'Ownership::getData/$1/$2/$3/$4/$5/$6');
$routes->add('ownership/save', 'Ownership::save');

service('auth')->routes($routes);
