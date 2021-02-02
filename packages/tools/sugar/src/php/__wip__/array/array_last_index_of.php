<?php

namespace thorin;

/**
 * This method is like `Thorin::array_index_of` except that it iterates over elements of
 * `array` from right to left.
 *
 * @param    {Array}    $array    The array to inspect
 * @param    {Mixed}    $value    The value to search for
 * @param    {Integer}    [$fromIndex=null]    The index to search from
 * @return    {Integer}    The index of the matched value, else `-1`
 *
 * @example    php
 * Thorin::array_last_index_of([1, 2, 1, 2], 2);
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/lastIndexOf.php
 */
function array_last_index_of(array $array, $value, int $fromIndex = null): int {
	return \_::lastIndexOf($array, $value, $fromIndex);
}
