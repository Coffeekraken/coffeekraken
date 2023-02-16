<?php

namespace thorin;

/**
 * Get top level domain of the provided url in array format.
 * If no url is specified, take the current one as input.
 *
 * @param    {String}    [$url=null]    The url to extract the tld from
 * @return    {String}    The top level domain extracted
 *
 * @example    php
 * Thorin::tld('http://thorin.io/hello/world?query=value1');
 * // io
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function tld($url = null) {
	if (!$url) {
		$url = \Purl\Url::fromCurrent();
	}
	$purl = \Purl\Url::parse($url);
	return $purl->publicSuffix;
}
