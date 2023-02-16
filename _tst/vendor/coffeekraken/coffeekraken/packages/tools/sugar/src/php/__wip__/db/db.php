<?php
/**
 * Return eloquent connection [Illuminate\Database\Connection](https://laravel.com/api/5.3/Illuminate/Database/Connection.html) instance of the requested connection
 * @param    {String}    [$connection=null]    The connection name requested. If not passed, will take the db.default_connection config.
 * @return    Illuminate\Database\Connection    An eloquent connection instance to work with
 *
 * @example    php
 * $db = Thorin::db('mysql');
 * $users = $db->table('users')->get();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
function db($connection = null) {
	return Thorin::db_connection_factory($connection);
}
