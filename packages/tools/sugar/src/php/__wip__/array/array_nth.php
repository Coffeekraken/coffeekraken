<?php

namespace thorin;

/**
 * Gets the element at index `n` of `array`. If `n` is negative, the nth
 * element from the end is returned.
 *
 * @param    {Array}    $array    The array to inspect
 * @param    {Integer}    $n    The index of the element to return
 * @return    {Mixed}    The nth element of `array`
 *
 * @example    php
 * Thorin::array_nth(['a', 'b', 'c', 'd'], 2);
 * // b
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/nth.php
 */
function array_nth(array $array, int $n) {
	return \_::nth($array, $n);
}
