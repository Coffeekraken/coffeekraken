<?php

namespace thorin;

/**
 * Register a route for a certain HTTP method with a certain path.
 * Attach to it a method that will be called when the route is triggered.
 *
 * @param    {String}    $method    The HTTP method used to trigger the route. Can be GET, POST, PUT, DELETE or OPTIONS
 * @param    {String}    $path    The path used to trigger the route. Can be any string + any arguments @see https://github.com/klein/klein.php
 * @param    {Function}    $function    The function to trigger. Usually return some HTML but can return whatever you prefer
 *
 * @example    php
 * Thorin::route('GET', '/hello-world', function() {
 *     return 'Hello world';
 * })
 * Thorin::route('DELETE', '/trash', function() {
 *     return 'trash deleted';
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
function route($method, $path, $function) {
	$klein = new \Klein\Klein();
	$klein->respond($method, $path, $function);
	$klein->dispatch();
}
