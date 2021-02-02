<?php

namespace thorin;

use duncan3dc\Sessions\Session;

/**
 * Get or set a value in session
 * To delete the value, pass -1 as $value parameter
 * @param    {String}    $key    The key name
 * @param    {Mixed}    [$value=null]    The value to save
 * @return    {Mixed}    The value stored in session
 *
 * @example    php
 * Thorin::session('my-key', 'my value');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function session($key, $value = null) {
	if ($value === -1) {
		$val = Session::get($key);
		Session::delete($key);
		return $val;
	} else if ($value) {
		Session::set($key, $value);
		return $value;
	} else {
		return Session::get($key);
	}
}
