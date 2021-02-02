<?php

namespace thorin;

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @param    {String}    $string    The string to convert
 * @return    {String}    The converted string
 *
 * @example    php
 * Thorin::str_start_case('--foo-bar--');
 * // => 'Foo Bar'
 *
 * Thorin::str_start_case('fooBar');
 * // => 'Foo Bar'
 *
 * Thorin::str_start_case('__FOO_BAR__');
 * // => 'FOO BAR'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/startCase.php
 */
function str_start_case(string $string) {
	return \_::startCase($string);
}
