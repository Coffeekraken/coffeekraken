<?php

namespace thorin;

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @param    {String}    $string    The string to pad
 * @param    {Integer}    $length    The padding length
 * @param    {String}    [$chars=' ']    The string used as padding
 *
 * @example    php
 * Thorin::str_pad_end('abc', 6);
 * // 'abc   '
 * Thorin::str_pad_end('abs', 6, '_-');
 * // 'abc_-_'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/padEnd.php
 */
function str_pad_end(string $string, int $length, string $chars = ' '):string {
	return \_::padEnd($string, $length, $chars);
}
