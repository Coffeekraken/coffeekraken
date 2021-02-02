<?php

namespace thorin;

/**
 * Return the app path depending on the `path.app` config
 *
 * @param       {String}        $slug       An optional slug to add to the root url
 * @return      {String}                    The corresponding root url
 *
 * @example    php
 * Thorin::app_path('config/hello.php');
 * // /app/root/config/hello.php
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function app_path($slug = '') {
	return \Thorin::sanitize_path(\Thorin::config('path.app')) . ltrim($slug, '/');
}
