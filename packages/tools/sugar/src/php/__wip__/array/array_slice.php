<?php

namespace thorin;

/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * @param    {Array}    $array    The array to process
 * @param    {Integer}    $start    The start position
 * @param    {Integer}    $end    The end position
 *
 * @example    php
 * $array = [1,2,3,4,5];
 * Thorin::array_slide($array, 1, 3);
 * // [2,3,4]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/slice.php
 */
function array_slice(array $array, int $start, int $end = null): array {
	return \_::slice($array, $start, $end);
}
