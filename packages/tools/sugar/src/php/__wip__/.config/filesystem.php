<?php

return [

	/**
	 * @name    default_disk
	 * Specify the default disk to use when using the filesystem factory with no arguments
	 * Can be base, document_root, assets or any disk that you have in your config
	 * @type    {String}
	 */
	'default_disk' => 'base',

	/**
	 * @name    disks
	 * Configure all the disks that your application need to work with.
	 * Each disk need a driver and the proper configuration for it.
	 * The driver can be local, ftp, sftp, s3 or memory
	 */
	'disks' => [
		/**
		 * @name    base
		 * Project root folder
		 * @type    {Array}
		 */
		'base' => [
			'driver' => 'local',
			'path' => '${path.base}'
		],
		/**
		 * @name    document_root
		 * Document root folder
		 * @type    {Array}
		 */
		'document_root' => [
			'driver' => 'local',
			'path' => '${path.document_root}'
		],
		/**
		 * @name    assets
		 * Assets folder
		 * @type    {Array}
		 */
		'assets' => [
			'driver' => 'local',
			'path' => '${path.assets}'
		]
		/**
		 * @name    s3
		 * S3 bucket
		 * @type    {Array}
		 */
		// 's3' => [
		//  'driver' => 's3',
		// 	'key' => 'your key',
		// 	'secret' => 'your secret',
		// 	'region' => 'your region',
		// 	'bucket' => 'your bucket',
		// 	'root' => '/bucket/root/path'
		// ],
		/**
		 * @name    ftp
		 * Ftp disk
		 * @type    {Array}
		 */
		// 'ftp' => [
		//  'driver' => 'ftp',
		// 	'host' => null,
		// 	'username' => null,
		// 	'password' => null,
		// 	'root' => null,
		// 	'port' => 21,
		// 	'passive' => true,
		// 	'ssl' => true,
		// 	'timeout' => 30
		// ],
		/**
		 * @name    sftp
		 * SFTP disk
		 * @type    {Array}
		 */
		// 'sftp' => [
		//  'driver' => 'sftp',
		// 	'host' => null,
		// 	'username' => null,
		// 	'password' => null,
		// 	'root' => null,
		// 	'port' => 22,
		// 	'timeout' => 30
		// ],
		/**
		 * @name    memory
		 * Memory disk
		 * @type    {Array}
		 */
		// 'memory' => [
		// 	'driver' => 'memory'
		// ]
	]
];
