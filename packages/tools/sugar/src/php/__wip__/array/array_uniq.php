<?php

namespace thorin;

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @param    {Array}    $array    The array to inspect
 * @return    {Array}    The new duplicate free array
 *
 * @example    php
 * Thorin::array_uniq([2, 1, 2]);
 * // [2,1]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/uniq.php
 */
function array_uniq(array $array = []): array {
	return \_::uniq($array);
}
