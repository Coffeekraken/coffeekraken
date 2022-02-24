<?php

namespace thorin;

/**
 * Get subdomain of the provided url in array format.
 * If no url is specified, take the current one as input.
 *
 * @param    {String}    [$url=null]    The url to extract the subdomain from
 * @return    {String}    The subdomain extracted, null if doesn't exist
 *
 * @example    php
 * Thorin::subdomain('http://hello.thorin.io/hello/world?query=value1');
 * // hello
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function subdomain($url = null) {
	if (!$url) {
		$url = \Purl\Url::fromCurrent();
	}
	$purl = \Purl\Url::parse($url);
	return $purl->subdomain;
}
