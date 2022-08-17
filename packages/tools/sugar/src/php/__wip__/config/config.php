<?php

namespace thorin;

$t_configs = [];
/**
 * Get a configuration depending on the path passed
 * @param    {String}    $path    The configuration path to get
 *
 * @example    php
 * print Thorin::config('app.environment');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function config($path) {
	global $t_configs;
	// split the path using the . as separator
	$splits = explode('.', $path);
	// file to load is the first value in the splits stack
	$filename = array_shift($splits);
	// check if a config file exist with this filename
	$filepath = \Thorin::sanitize_path(\Thorin::config_path()) . $filename . '.php';
	$basefilepath = __DIR__ . '/../../config/' . $filename . '.php';
	if ( ! file_exists($filepath) && ! file_exists($basefilepath)) {
		throw new \Exception('The config file "' . $filename . '" does not exist');
	}
	// load this file
	if (!isset($t_configs[$filepath])) {
		if ( file_exists($filepath)) {
			$config = require($filepath);
		} else {
			$config = [];
		}
		if (file_exists($basefilepath)) {
			$baseConfig = require($basefilepath);
			// merge the configs
			$config = \Thorin::extend($baseConfig, $config, true, false);
		}
		// cache config
		$t_configs[$filepath] = $config;
	} else {
		$config = $t_configs[$filepath];
	}
	// transform the dot path to an array like one
	$path = implode("']['", $splits);
	$path = "['".$path."']";
	$path = strtolower($path);
	// return the value from the languages stack
	$value = @eval('return $config'.$path.';');
	// process value :
	if (is_array($value)) {
		array_walk_recursive($value, function(&$item) {
			if (is_string($item)) {
				$item = \Thorin::config_replace_tokens($item);
			}
		});
	} else if (is_string($value)) {
		$value = \Thorin::config_replace_tokens($value);
	}
	// return the value
	return $value;
}

function config_replace_tokens($value) {
	preg_match_all('#\$\{[a-zA-Z0-9._-]+\}#', $value, $matches);
	foreach($matches[0] as $token) {
		$tokenPath = \str_replace('${','',$token);
		$tokenPath = \str_replace('}','',$tokenPath);
		$tokenValue = \Thorin::config($tokenPath);
		$value = \str_replace($token, $tokenValue, $value);
	}
	return $value;
}
