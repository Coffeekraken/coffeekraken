<?php

namespace thorin;

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @param    {String}    $string    The string to convert
 * @return    {String}    The converted string
 *
 * @example    php
 * Thorin::str_camel_case('Foo Bar');
 * // fooBar
 * Thorin::str_camel_case('--foo-bar--');
 * // fooBar
 * Thorin::str_camel_case('__FOO_BAR__');
 * // fooBar
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/camelCase.php
 */
function str_camel_case(string $string):string {
	return \_::camelCase($string);
}
