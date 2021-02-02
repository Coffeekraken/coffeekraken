<?php

namespace thorin;

/**
 * Return the root website url depending on the `app.root_url` config
 *
 * @param       {String}        $slug       An optional slug to add to the root url
 * @param  		{Boolean} 		[$include_domain=false] 	If want the fully qualified domain in the url
 * @return      {String}                    The corresponding root url
 *
 * @example    php
 * Thorin::root_url('my/cool/file.pdf');
 * // /my/cool/file.pdf
 *
 * Thorin::root_url('my/cool/file.pdf', true);
 * // https://thorin.io/my/cool/file.pdf
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function root_url($slug = '', $include_domain = false) {
	if ($include_domain) {
		$url = \Thorin::str_tailslash(rtrim(\Thorin::config('app.root_url'),'/')) . ltrim($slug, '/');
	} else {
		$url = \Thorin::str_headslash($slug);
	}
	return \Thorin::sanitize_url($url);
}
