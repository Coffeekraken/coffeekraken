<?php

namespace thorin;

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @param    {Array}    ...$arrays    The arrays to inspect
 * @return    {Array}    The new array of combined values
 *
 * @example    php
 * Thorin::array_union([2], [1, 2]);
 * // [2, 1]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/union.php
 */
function array_union(array ...$arrays): array {
	return \_::union(...$arrays);
}
