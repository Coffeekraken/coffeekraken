<?php

namespace thorin;

use duncan3dc\Sessions\Session;

/**
 * Get or set a value in session flash.
 * Flash mean that the value will live until the value is accessed. Then the value is killed.
 * @param    {String}    $key    The key name
 * @param    {Mixed}    [$value=null]    The value to save
 * @return    {Mixed}    The value stored in session
 *
 * @example    php
 * Thorin::session_flash('my-key', 'my value');
 * print Thorin::session_flash('my-key'); // my value
 * print Thorin::session_flash('my-key'); // null
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function session_flash($key, $value = null) {
	if ($value === -1) {
		return Session::getFlash($key);
	} else if ($value) {
		Session::setFlash($key, $value);
		return $value;
	} else {
		return Session::getFlash($key);
	}
}
