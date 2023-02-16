<?php

namespace thorin;

/**
 * Format/beautify array
 *
 * @param       {Array}        $array         The array to be beautify
 * @return    {String}    The beautified array version
 *
 * @example    php
 * print Thorin::pre($myArray);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function pre($array) {

	$res = [];
	array_push($res, '<pre>');
	array_push($res, print_r($array, true));

	if (is_object($array)) {
		// methods
		$methods = get_class_methods($array);
		if (count($methods)) {
			array_push($res, '<strong>methods</strong>');
			array_push($res, '');
			foreach($methods as $method) {
				// get the method parameters
				$ReflectionMethod =  new \ReflectionMethod($array, $method);
				$params = $ReflectionMethod->getParameters();
				$paramNames = array_map(function( $item ){
					return '$'.$item->getName();
				}, $params);
				array_push($res, '- ' . $method . ' (' . implode(', ', $paramNames) . ')');
			}
			array_push($res, '');
		}
	}

	array_push($res, '</pre>');
	return implode("\n", $res);
}
