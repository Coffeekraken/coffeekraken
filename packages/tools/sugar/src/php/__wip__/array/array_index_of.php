<?php

namespace thorin;

/**
 * Gets the index at which the first occurrence of `value` is found in `array`
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. If `fromIndex` is negative, it's used as the
 * offset from the end of `array`.
 *
 * @param    {Array}    $array    The array to inspect
 * @param    {Mixed}    $value    The value to search for
 * @param    {Integer}    [$fromIndex=null]    The index to search from
 * @return    {Integer}    The index of the matched value, otherwise -1
 *
 * @example    php
 * Thorin::array_index_of([1, 2, 1, 2], 2);
 * // 1
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/indexOf.php
 */
function array_index_of(array $array, $value, int $fromIndex = null): int {
	return \_::indexOf($array, $value, $fromIndex);
}
