<?php

namespace thorin;

/**
 * Return the environment variable that correspond to the requested one or a default value passed as a second parameter
 * @param    {String}    $name    The name of the environment variable to get
 * @param    {Mixed}    [$default=null]    The value to return if the environment variable does not exist
 *
 * @example    php
 * $myValue = Thorin::env('MY_VARIABLE', false);
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function env($name, $default = null) {
	$value = \getenv($name);
	if ($value === false) {
		return $default;
	}
	return $value;
}
