<?php

namespace thorin;

/**
 * Get the protocol of a url.
 * If no url is provided, will take the current one as input.
 *
 * @param    {String}    [$url=null]    The url to extract the query string from
 * @return    {Array}    The protocol from the url
 *
 * @example    php
 * Thorin::protocol('https://thorin.io?query=value1&string=value2');
 * // https
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function protocol($url = null) {
	if (!$url) {
		$url = \Purl\Url::fromCurrent();
	}
	$purl = \Purl\Url::parse($url);
	return $purl->scheme;
}
