<?php

namespace thorin;

/**
 * Get the query string of a url in array key->pair format.
 * If no url is provided, will take the current one as input.
 *
 * @param    {String}    [$url=null]    The url to extract the query string from
 * @return    {Array}    The query string in key->pair format
 *
 * @example    php
 * Thorin::query_string('https://thorin.io?query=value1&string=value2');
 * // ['query' => 'value1', 'string' => 'value2']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function query_string($url = null) {
	if (!$url) {
		$url = \Purl\Url::fromCurrent();
	}
	$purl = \Purl\Url::parse($url);
	return $purl->query->getData();
}
