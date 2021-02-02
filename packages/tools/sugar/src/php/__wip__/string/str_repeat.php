<?php

namespace thorin;

/**
 * Repeats the given string `n` times.
 *
 * @param    {String}    $string    The string to repeat
 * @param    {Integer}   [$n=1]    The number of times to repeat the string.
 * @return   {String}    The repeated string.
 *
 * @example    php
 * Thorin::str_repeat('*', 3);
 * // => '***'
 * Thorin::str_repeat('abc', 2);
 * // => 'abcabc'
 * Thorin::str_repeat('abc', 0);
 * // => ''
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/repeat.php
 */
function str_repeat(string $string, int $n = 1):string {
	return \_::repeat($string, $n);
}
