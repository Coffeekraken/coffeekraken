<?php

namespace thorin;

/**
 * Converts `string`, as space separated words, to lower case.
 *
 * @param    {String}    $string    The string to convert
 * @return    {String}    The converted string
 *
 * @example    php
 * Thorin::str_lower_case('--Foo-Bar--');
 * // foo bar
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/lowerCase.php
 */
function str_lower_case(string $string) {
	return \_::lowerCase($string);
}
