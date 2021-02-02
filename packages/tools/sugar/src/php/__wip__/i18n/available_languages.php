<?php

namespace thorin;

/**
 * Return the available languages set in configuration
 *
 * @example    php
 * $langs = Thorin::available_languages();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function available_languages() {
	$languages = \Thorin::config('i18n.available_languages');
	if (is_string($languages)) {
		$languages = explode(',', $languages);
		$languages = array_map(function($lang) {
			return trim($lang);
		}, $languages);
	}
	return $languages;
}
