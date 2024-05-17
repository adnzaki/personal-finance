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
$routes->add('ownership/save/(:any)', 'Ownership::save/$1');
$routes->add('ownership/detail/(:any)', 'Ownership::getDetail/$1');
$routes->add('ownership/delete/(:any)', 'Ownership::delete/$1');
service('auth')->routes($routes);
