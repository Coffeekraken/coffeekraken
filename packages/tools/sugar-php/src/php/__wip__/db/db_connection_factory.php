<?php

namespace thorin;

$t_db_connections = [];

/**
 * Return eloquent connection [Illuminate\Database\Connection](https://laravel.com/api/5.3/Illuminate/Database/Connection.html) instance of the requested connection
 * @param    {String}    [$connection=null]    The connection name requested. If not passed, will take the db.default_connection config.
 * @return    Illuminate\Database\Connection    An eloquent connection instance to work with
 *
 * @example    php
 * $db = Thorin::db_connection_factory('mysql');
 * $users = $db->table('users')->get();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
function db_connection_factory($connection = null) {
	global $t_db_connections;
	// get the default db if not passed
	if ( ! $connection) {
		return \Thorin::db_factory(\Thorin::config('db.default_connection'));
	}
	// handle no config
	$config = \Thorin::db_connection_config($connection);
	if ( ! $config) {
		throw new Exception('The db connection "'.$connection.'" does not exist');
	}
	// get the eloquent capsule
	$db_capsule = \Thorin::db_eloquent_capsule();
	// make sure the driver passed in in lowercase
	if ($connection) $connection = strtolower($connection);
	// check if a pool already exist with this driver
	if (isset($t_db_connections[$connection])) {
		// return the cached pool
		return $t_db_connections[$connection];
	}
	$db_connection = $db_capsule->getConnection($connection);
	// save db in stack to avoid creating multiple db of the same name
	$t_db_connections[$connection] = $db_connection;
	// return the new db connection
	return $db_connection;
}
