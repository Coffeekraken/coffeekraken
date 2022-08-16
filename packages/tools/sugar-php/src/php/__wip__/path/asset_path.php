<?php

namespace thorin;

/**
 * Return a path relative to the `path.assets` config
 *
 * @param       {String}        $slug       The asset slug to get
 * @return      {String}                    The corresponding asset path like /dist/my-cool-file.jpg
 *
 * @example    php
 * Thorin::asset_path('my/cool/picture.jpg');
 * // /app/root/dist/my/cool/picture.jpg
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function asset_path($slug) {
	return  \Thorin::sanitize_path(\Thorin::config('path.assets')) . ltrim($slug, '/');
}
