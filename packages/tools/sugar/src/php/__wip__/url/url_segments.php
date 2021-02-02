<?php

namespace thorin;

/**
 * Get segments of the provided url in array format.
 * If no url is specified, take the current one as input.
 *
 * @param    {String}    [$url=null]    The url to extract the segments from
 * @return    {Array}    The array of url segments
 *
 * @example    php
 * Thorin::url_segments('http://thorin.io/hello/world?query=value1');
 * // ['hello','world']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function url_segments($url = null) {
	if (!$url) {
		$url = \Purl\Url::fromCurrent();
	}
	$purl = \Purl\Url::parse($url);
	return \Thorin::array_remove_empty($purl->path->getData());
}
