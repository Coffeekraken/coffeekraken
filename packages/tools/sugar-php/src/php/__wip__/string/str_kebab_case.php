<?php

namespace thorin;

/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @param    {String}    $string    The string to convert
 * @return    {String}    The converted string
 *
 * @example    php
 * Thorin::str_kebab_case('Foo Bar');
 * // foo-bar
 * Thorin::str_kebab_case('fooBar');
 * // foo-bar
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/kebabCase.php
 */
function str_kebab_case(string $string) {
	return \_::kebabCase($string);
}
