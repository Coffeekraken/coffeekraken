<?php

namespace thorin;

/**
 * Return a db connection configuration array
 * @param    {String}    [$name=null]    The name of the db connection wanted. If not specified will take the db.default_connection config
 * @return    {Array}    The db connection configuration
 *
 * @example    php
 * $config = Thorin::db_connection_config('db1');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function db_connection_config($name = null) {
	if ($name === null) {
		$name = \Thorin::config('db.default_connection');
	}
	$name = strtolower($name);
	return \Thorin::config('db.connections.' . $name);
}
