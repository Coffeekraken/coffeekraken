<?php

namespace thorin;

use voku\helper\Hooks;

/**
 * Call the functions added to a filter hook.
 * @param    {String}    $name    The name of the filter hook
 * @param    {Mixed}    $value    The value on which the filters hooked to `$name` are applied on
 * @param    {Mixed}    $var...    Additional variables passed to the functions hooked to `$name`
 * @return    {Mixed}    The filtered value after all hooked functions are applied to it
 *
 * @example    php
 * Thorin::add_filter('my-filter', function($value) {
 *   return 'Hello ' . $value;
 * });
 * print Thorin::apply_filters('my-filter', 'world'); // Hello world
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://packagist.org/packages/voku/php-hooks
 */
function apply_filters() {
	$hooks = Hooks::getInstance();
	return call_user_func_array([$hooks, 'apply_filters'], func_get_args());
}
