<?php

namespace thorin;

/**
 * Return a value from the lang files. First part of the path define the file to pick the language string from.
 * Exemple : `newsletter.title` will load the `newsletter` file and search for the `title` inside.
 * @param    {String}    $path    The doted path relative to the root of the lang file to get the value from
 * @param    {String}    [$lang=null]    The language in which you want the value. If not set, will be getted using the t_get_language function depending on your configuration
 *
 * @example    php
 * $myCoolString = Thorin::lang('newsletter.title');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function lang($path, $lang = null) {
	// if no lang is passed as parameter,
	// get it with the t_language function using
	// the config
	if ($lang == null) {
		$lang = \Thorin::language();
	}
	// get the default language
	$defaultLanguage = \Thorin::default_language();
	// split the path using the . as separator
	$splits = explode('.', $path);
	// file to load is the first value in the splits stack
	$filename = array_shift($splits);
	// build the language file path
	$langFilePath = \Thorin::sanitize_path(\Thorin::config('path.lang')) . $lang . '/' . $filename . '.php';
	// check if this file does not exist to throw an exception
	if (!file_exists($langFilePath)) {
		throw new \Exception('The language file "' . $langFilePath . '" does not exist...');
	}
	// load this file
	$languages = require($langFilePath);
	// transform the dot path to an array like one
	$arrayPath = implode("']['", $splits);
	$arrayPath = "['".$arrayPath."']";
	// get the value from the languages stack
	$value = @eval('return $languages'.$arrayPath.';');
	// if no value, and lang is not the default one, try to get the value
	// from the default lang
	if (!$value && $lang !== $defaultLanguage) {
		$value = \Thorin::lang($path, $defaultLanguage);
	}
	// return the value
	return $value;
}
