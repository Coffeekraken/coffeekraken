<?php

namespace thorin;

/**
 * Check if the environment correspond to at least 1 passed environments
 * @param    {String}    $environments...    The environments to check
 * @return    {Boolean}    true if 1 environment match the actual environment
 *
 * @example    php
 * if (Thorin::is_environment('testing','production')) {
 *     // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function is_environment() {
	$args = func_get_args();
	$environment = \Thorin::environment();
	foreach($args as $env) {
		if ($environment == $env) return true;
	}
	return false;
}
