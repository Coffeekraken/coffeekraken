<?php

namespace thorin;

/**
 * Creates an array of `array` values not included in the other given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * **Note:** Unlike `Thorin::array_pullAll`, this method returns a new array.
 *
 * @param    {Array}    $array    The array to inspect
 * @param    {Array}    ...$values    The values to exclude
 * @return    {Array}    The new array of filtered values
 *
 * @example    php
 * Thorin::array_difference([2, 1], [2, 3]);
 * // [1]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/difference.php
 */
function array_difference(array $array, array ...$values): array {
    return \array_values(\array_diff($array, ...$values));
}
