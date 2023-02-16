<?php

namespace thorin;

/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @param    {String}    $string    The string to split
 * @param    {String}    $separator    The separator pattern to split by
 * @param    {Integer}    [$limit=0]     The length to truncate results to
 * @return    {Array}    The string segments.
 *
 * @example    php
 * Thorin::str_split('a-b-c', '-', 2);
 * // => ['a', 'b']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/split.php
 */
function str_split(string $string, string $separator, int $limit = 0):array {
	return \_::split($string, $separator, $limit);
}
