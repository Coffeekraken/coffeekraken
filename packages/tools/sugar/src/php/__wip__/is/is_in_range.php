<?php

namespace thorin;

/**
 * Checks if `number` is between `start` and up to, but not including, `end`. If
 * `end` is not specified, it's set to `start` with `start` then set to `0`.
 * If `start` is greater than `end` the params are swapped to support
 * negative ranges.
 *
 * @param    {Float}    $number    The number to check
 * @param    {Float}    $start    The start of the range
 * @param    {Float}    [$end=0]    The end of the range
 * @return    {Boolean}    `true` if `number` is in the range, else `false`
 *
 * @example    php
 * Thorin::is_in_range(3, 2, 4);
 * // true
 * Thorin::is_in_range(4, 8);
 * // true
 * Thorin::is_in_range(4, 2);
 * // false
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Number/inRange.php
 */
function is_in_range(float $number, float $start = 0, float $end = 0):bool {
	return \_::inRange($number, $start, $end);
}
