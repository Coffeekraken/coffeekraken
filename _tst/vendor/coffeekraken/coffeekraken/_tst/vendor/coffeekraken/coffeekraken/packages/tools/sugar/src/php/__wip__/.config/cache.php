<?php

return [

	/**
	 * @name    default_driver
	 * Specify the default cache driver to use
	 * @type    {String}
	 * @default    filesystem
	 */
	'default_driver' => 'filesystem',

	/**
	 * @name    memcache
	 * Memcache connexion settings
	 * @type    {Array}
	 */
	'memcache' => [
		/**
		 * @name    memcache.host
		 * Memcache host
		 * @type    {String}
		 * @default    localhost
		 */
		'host' => Thorin::env('MEMCACHE_HOST', 'localhost'),

		/**
		 * @name    memcache.port
		 * Memcache port
		 * @type    {Integer}
		 * @default    11211
		 */
		'port' => Thorin::env('MEMCACHE_PORT', 11211)
	],

	/**
	 * @name    memcached
	 * Memcached connexion settings
	 * @type    {Array}
	 */
	'memcached' => [
		/**
		 * @name    memcached.host
		 * Memcached host
		 * @type    {String}
		 * @default    localhost
		 */
		'host' => Thorin::env('MEMCACHED_HOST', 'localhost'),

		/**
		 * @name    memcached.port
		 * Memcached port
		 * @type    {Integer}
		 * @default    11211
		 */
		'port' => Thorin::env('MEMCACHED_PORT', 11211)
	],

	/**
	 * @name    redis
	 * Redis connexion settings
	 * @type    {Array}
	 */
	'redis' => [
		/**
		 * @name    redis.host
		 * Redis host
		 * @type    {String}
		 * @default    127.0.0.1
		 */
		'host' => Thorin::env('REDIS_HOST', '127.0.0.1'),

		/**
		 * @name    redis.port
		 * Redis port
		 * @type    {Integer}
		 * @default    6379
		 */
		'port' => Thorin::env('REDIS_PORT', 6379)
	]
];
