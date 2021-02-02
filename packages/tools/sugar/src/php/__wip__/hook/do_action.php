<?php

namespace thorin;

use voku\helper\Hooks;
/**
 * Execute all the corresponding actions registered with the `t_add_action` function.
 * @param    {String}    $name    The action name to execute
 * @param    {Mixed}    $args...    Optional additional arguments which are passed on to the functions hooked to the action.
 *
 * @example    php
 * Thorin::do_action('my-action');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://packagist.org/packages/voku/php-hooks
 */
function do_action() {
	$hooks = Hooks::getInstance();
	call_user_func_array([$hooks, 'do_action'], func_get_args());
}
