<?php

namespace thorin;

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @param    {String}    $string    The string to pad
 * @param    {Integer}    $length    The padding length
 * @param    {String}    [$chars=' ']    The string used as padding
 *
 * @example    php
 * Thorin::str_pad_startd('abc', 6);
 * // '   abc'
 * Thorin::str_pad_start('abs', 6, '_-');
 * // '_-_abc'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/padStart.php
 */
function str_pad_start(string $string, int $length, string $chars = ' '):string {
	return \_::padStart($string, $length, $chars);
}
