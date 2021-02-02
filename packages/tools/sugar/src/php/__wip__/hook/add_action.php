<?php

namespace thorin;

use voku\helper\Hooks;
/**
 * Add an action linked to a callback that will be called when the `t_do_action` with the same name is called.
 * @param    {String}    $name    The action name to register
 * @param    {Callable}    $callback    The function to call
 * @param    {Integer}    [$priority=10]    Used to specify the order in which the functions associated with a particular action are executed (default: 10). Lower numbers correspond with earlier execution, and functions with the same priority are executed in the order in which they were added to the action.
 * @param    {Integer}    [$accepted_args=1]    The number of arguments the function accept (default 1).
 *
 * @example    php
 * Thorin::add_action('my-action', function() {
 *   // do something
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://packagist.org/packages/voku/php-hooks
 */
function add_action($name, $callback, $priority = 10, $accepted_args = 1) {
	$hooks = Hooks::getInstance();
	$hooks->add_action($name, $callback, $priority, $accepted_args);
}
