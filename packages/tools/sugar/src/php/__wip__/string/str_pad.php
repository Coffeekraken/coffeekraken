<?php

namespace thorin;

/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @param    {String}    $string    The string to pad
 * @param    {Integer}    $length    The padding length
 * @param    {String}    [$chars=' ']    The string used as padding
 * @return    {String}    The padded string
 *
 * @example    php
 * Thorin::str_pad('abc', 8);
 * // '  abc   '
 * Thorin::str_pad('abs', 8, '_-');
 * // '_-abc_-_'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/pad.php
 */
function str_pad(string $string, int $length, string $chars = ' '):string {
	return \_::pad($string, $length, $chars);
}
