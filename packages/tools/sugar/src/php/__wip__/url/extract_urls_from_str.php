<?php

namespace thorin;

/**
 * Extract the url's from the passed string. Return the result in array format
 *
 * @param    {String}    $string    The string to extract the url's from
 * @return    {Array}    The array of url's extracted
 *
 * @example    php
 * $string = 'Hello https://google.com, this is the universe talking';
 * Thorin::extract_urls_from_str($string);
 * // ['https://google.com']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function extract_urls_from_str($string) {
	$urls = \Purl\Url::extract($string);
	$urls = array_map(function($url) {
		return (string) $url;
	}, $urls);
	return $urls;
}
