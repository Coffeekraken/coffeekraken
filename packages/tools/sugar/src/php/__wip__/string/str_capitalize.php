<?php

namespace thorin;

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @param    {String}    $string    The string to convert
 * @return    {String}    The converted string
 *
 * @example    php
 * Thorin::str_capitalize('FRED');
 * // Fred
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/capitalize.php
 */
function str_capitalize(string $string):string {
	return \_::capitalize($string);
}
