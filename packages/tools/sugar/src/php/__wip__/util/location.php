<?php

namespace thorin;

/**
 * Retreive a location from a passed ip address. If no ip address is passed,
 * will try to get the user one automaticaly.
 * This function use [ipinfo.io](https://ipinfo.io) webservice that authorize 1'000 requests per day so you are warned.
 * @param    {String}    [$ip_address=null]    The ip address to find the location from
 *
 * @example    php
 * $location = Thorin::location();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function location($ip_address = null) {
	// get ip if not passed
	if (!$ip_address) {
		$ip_address = \Thorin::ip_address();
	}
	// get location from geo
	$geo = file_get_contents('http://ipinfo.io/' . $ip_address . '/geo');
	// check that we have a response
	if (!empty($geo)) {
		$geo = json_decode($geo, true);
	}
	// return the location informations
	return $geo;
}
