<?php

namespace thorin;

/**
 * Return the base path depending on the `path.base` config
 *
 * @param       {String}        $slug       An optional slug to add to the base path
 * @return      {String}                    The corresponding base path
 *
 * @example    php
 * Thorin::base_path('my/cool/picture.jpg');
 * // /app/root/my/cool/picture.jpg
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function base_path($slug = '') {
	return \Thorin::sanitize_path(\Thorin::config('path.base')) . ltrim($slug, '/');
}
