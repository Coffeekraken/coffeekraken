<?php

namespace thorin;

/**
 * Check if the user ip address is in the list passed as argument
 * @param    {Array}    $ipsList    The list (array) of ips. Can be something like 345.33.*.*
 * @param    {String}    [$ip=null]    The ip to check agains the list. If null, will take the current user ip
 * @return    {Boolean}    true if ip is banned, false if not
 *
 * @example    php
 * if (Thorin::is_ip_match([127.0.0.1])) {
 *   // user ip is banned so do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function is_ip_match($ipsList, $ip = null) {
	// read user ip adress:
	if ($ip === null) {
		$userIp = \Thorin::ip_address();
	} else {
		$userIp = $ip;
	}
	$userIpSplits = explode('.',$userIp);
	// loop on each blacklisted ips
	foreach($ipsList as $ipOfList) {
		// if the ip match exactly
		if ($ipOfList === $userIp) return true;
		// split the ip by .
		$splits = explode('.', $ipOfList);
		// create a match flag
		$match = true;
		foreach($splits as $idx => $ipSegment) {
			if ($ipSegment !== '*' && $ipSegment !== $userIpSplits[$idx]) {
				$match = false;
				break;
			}
		}
		// if match is still true, return that the ip is banned
		if ($match) return true;
	}
	// otherwise, it mean that the ip does not match any blacklisted ones
	return false;
}
