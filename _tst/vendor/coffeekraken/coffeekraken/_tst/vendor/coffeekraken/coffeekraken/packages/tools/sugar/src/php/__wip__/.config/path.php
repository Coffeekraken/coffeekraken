<?php

return [
	/**
	 * @name 	document_root
	 * Specify the root path where your app is stored absolute to the server root folder.
	 * This is usually automatically setting up using the $_SERVER['DOCUMENT_ROOT']|$_SERVER['PWD'] variable
	 * Need to end with a trailing /
	 * @type 		{String}
	 * @default 	rtrim((isset($_SERVER['PWD'])) ? $_SERVER['PWD'] : $_SERVER['DOCUMENT_ROOT'], '/') . '/'
	 */
	'document_root' =>  rtrim((isset($_SERVER['PWD'])) ? $_SERVER['PWD'] : $_SERVER['DOCUMENT_ROOT'], '/') . '/',

	/**
	 * @name 		base
	 * Specify where the base folder of the project is stored absolute to the server root folder.
	 * This is not the DOCUMENT_ROOT. It represent the root of the files. The DOCUMENT_ROOT can be a subfolder of this one.
	 * Need to end with a trailing /
	 * @type  		{String}
	 * @default 	${path.document_root}../
	 */
	'base' => '${path.document_root}../',

	/**
	 * @name 		app
	 * Specify where the app files are stored absolute to the server root folder.
	 * Need to end with a trailing /
	 * @type 		{String}
	 * @default		${path.base}app/
	 */
	'app' => '${path.base}app/',

	/**
	 * @name 		assets
	 * Specify where the assets (images, etc...) are stored absolute to the server root folder.
	 * Need to end with a trailing /
	 * This path MUST be inside of the DOCUMENT_ROOT path
	 * This is bein used in functions like "asset_url", "asset_path", etc...
	 * @type 		{String}
	 * @default 	${path.document_root}dist/
	 */
	'assets' => '${path.document_root}dist/',

	/**
	 * @name 		cache_filesystem
	 * Specify where to store the filesystem cache
	 * Need to end with a trailing /
	 * This is bein used in functions like "cache", etc...
	 * @type 		{String}
	 * default 		${path.app}cache/filesystem/
	 */
	'cache_filesystem' => '${path.app}cache/filesystem/',

	/**
	 * @name 		lang
	 * Specify where the lang files are stored absolute to the server root folder.
	 * Need to end with a trailing /
	 * This is bein used in functions like "lang", etc...
	 * @type 		{String}
	 * @default 	${path.app}lang/
	 */
	'lang' => '${path.app}lang/',

	/**
	 * @name 		views
	 * Specify where the views are stored absolute to the server root folder.
	 * Need to end with a trailing /
	 * This is bein used in functions like "render_blade", "render", etc...
	 * @type 		{String}
	 * @default 	${path.app}views/
	 */
	'views' => '${path.app}views/',

	/**
	 * @name 		cache_path
	 * Specify where the cache are stored absolute to the server root folder
	 * Need to end with a trailing /
	 * This is bein used in functions like "render_blade", etc...
	 * @type 		{String}
	 * @default 	${path.app}cache/views/
	 */
	'views_cache' => '${path.app}cache/views/'
];
