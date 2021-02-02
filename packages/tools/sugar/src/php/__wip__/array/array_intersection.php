<?php

namespace thorin;

/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @param    {Array}    ...$arrays    The arrays to process
 * @return    {Array}    The new array of intersecting values
 *
 * @example    php
 * Thorin::array_intersection([2, 1], [2, 3]);
 * // [2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/intersection.php
 */
function array_intersection(array ...$arrays): array {
	return \_::intersection(...$arrays);
}
