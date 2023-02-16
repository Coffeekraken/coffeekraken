<?php

return [
	/**
	 * @name    default_connection
	 * Specify the default connection to use when requesting a db instance without any name
	 * @type    {String}
	 * @default    sqlite
	 */
	'default_connection' => Thorin::env('DB_CONNECTION', 'mysql'),

	/**
	 * @name    connections
	 * Specify each connections configurations
	 * @type    {Array}
	 */
	'connections' => [

		/**
		 * @name    sqlite
		 * sqlite db
		 * @type    {Array}
		 */
		'sqlite' => [
			'driver' => 'sqlite',
            'database' => Thorin::env('DB_PATH', Thorin::app_path('db/database.sqlite')),
            'prefix' => Thorin::env('DB_PREFIX', '')
		],
		/**
		 * @name    mysql
		 * Mysql db sample
		 * @type    {Array}
		 */
		'mysql' => [
			'driver' => 'mysql',
            'host' => Thorin::env('DB_HOST', '127.0.0.1'),
            'port' => Thorin::env('DB_PORT', 3306),
            'database' => Thorin::env('DB_DATABASE', 'forge'),
            'username' => Thorin::env('DB_USERNAME', 'root'),
            'password' => Thorin::env('DB_PASSWORD', ''),
            'unix_socket' => Thorin::env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => Thorin::env('DB_PREFIX', ''),
            'strict' => true,
            'engine' => null
		],
		/**
		 * @name    pgsql
		 * PostgreSql db sample
		 * @type    {Array}
		 */
		// 'pgsql' => [
		// 	'driver' => 'pgsql',
        //     'host' => Thorin::env('DB_HOST', '127.0.0.1'),
        //     'port' => Thorin::env('DB_PORT', 5432),
        //     'database' => Thorin::env('DB_DATABASE', 'forge'),
        //     'username' => Thorin::env('DB_USERNAME', 'root'),
        //     'password' => Thorin::env('DB_PASSWORD', ''),
        //     'charset' => 'utf8',
        //     'prefix' => Thorin::env('DB_PREFIX', ''),
        //     'schema' => 'public',
        //     'sslmode' => 'prefer',
		// ],
		/**
		 * @name    sqlsrv
		 * SQLServer db sample
		 * @type    {Array}
		 */
		// 'sqlsrv' => [
		// 	'driver' => 'sqlsrv',
        //     'host' => Thorin::env('DB_HOST', 'localhost'),
        //     'port' => Thorin::env('DB_PORT', 1433),
        //     'database' => Thorin::env('DB_DATABASE', 'forge'),
        //     'username' => Thorin::env('DB_USERNAME', 'root'),
        //     'password' => Thorin::env('DB_PASSWORD', ''),
        //     'charset' => 'utf8',
        //     'prefix' => Thorin::env('DB_PREFIX', ''),
		// ]
	]
];
