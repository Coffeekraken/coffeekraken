<?php

namespace thorin;

use voku\helper\Hooks;

/**
 * Hooks a function or method to a specific filter action.
 * @param    {String}    $name    The name of the filter to hook the $callback to
 * @param    {Callable}    $callback    The name of/or the function to be called when the filter is applied
 * @param    {Integer}    [$priority=10]    Used to specify the order in which the functions associated with a particular action are executed (default: 10). Lower numbers correspond with earlier execution, and functions with the same priority are executed in the order in which they were added to the action.
 * @param    {Integer}    [$accepted_args=1]    The number of arguments the function accept (default 1)
 * @return    {Boolean}    true
 *
 * @example    php
 * Thorin::add_filter('my-filter', function($value) {
 *   return 'Hello ' . $value;
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://packagist.org/packages/voku/php-hooks
 */
function add_filter($name, $callback, $priority = 10, $accepted_args = 1) {
	$hooks = Hooks::getInstance();
	return $hooks->add_filter($name, $callback, $priority, $accepted_args);
}
