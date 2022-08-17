<?php

namespace thorin;

/**
 * Define a constant if not already defined
 *
 * @param      {String}         $name       The constant name
 * @param       {Mixed}         $value      The value to set
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function define($name, $value) {
	$name = strtoupper($name);
	if ( ! \defined($name)) {
		\define($name, $value);
	}
}
