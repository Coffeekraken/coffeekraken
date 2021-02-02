<?php

namespace thorin;

/**
 * Return the application build version.
 * The build version will be taken either from:
 * 1. `config` The `app.build` config
 * 2. `txt` A file at the project root called `build.txt`
 * 3. `hash` Generating a hash from the `path.assets` folder
 *
 * @param    {String}    [$method=null]    The wanted method to get the build. By default it's `null`, meaning that it will try every methods one by one
 * @return    {String}    The build version
 *
 * @example    php
 * $domain = Thorin::app_build();
 * // 3jdujfh5g3jsd0w0s7c6nr57s3gv1yxk
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function app_build($method = null) {
	// check if has a build.txt file at root
	if ($method == 'config' || ($method == null && \Thorin::config('app.build'))) {
		return \Thorin::config('app.build');
	} else if ($method == 'txt' || ($method == null && is_file(\Thorin::base_path('build.txt')))) {
		ob_start();
		require(\Thorin::base_path('build.txt'));
		return trim(ob_get_clean());
	} else if ($method == 'hash' || $method == null) {
		return \Thorin::hash_directory(\Thorin::asset_path('/'));
	}
}
