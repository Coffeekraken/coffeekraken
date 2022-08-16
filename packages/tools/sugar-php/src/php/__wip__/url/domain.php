<?php

namespace thorin;

/**
 * Get domain of the provided url in array format.
 * If no url is specified, take the current one as input.
 *
 * @param    {String}    [$url=null]    The url to extract the domain from
 * @return    {String}    The domain extracted
 *
 * @example    php
 * Thorin::domain('http://thorin.io/hello/world?query=value1');
 * // thorin.io
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function domain($url = null) {
	if (!$url) {
		$url = \Purl\Url::fromCurrent();
	}
	$purl = \Purl\Url::parse($url);
	return $purl->registerableDomain;
}
