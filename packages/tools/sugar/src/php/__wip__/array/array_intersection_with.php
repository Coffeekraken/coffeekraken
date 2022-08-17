<?php

namespace thorin;

/**
 * This method is like `Thorin::array_intersection` except that it accepts `comparator`
 * which is invoked to compare elements of `arrays`. The order and references
 * of result values are determined by the first array. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * @param    {Array}    ...$arrays    The arrays to process
 * @param    {Callable}    $comparator    The comparator invoked per element
 * @return    {Array}    The new array of intersecting values
 *
 * @example    php
 * $objects = [[ 'x' => 1, 'y' => 2 ], [ 'x' => 2, 'y' => 1 ]]
 * $others = [[ 'x' => 1, 'y' => 1 ], [ 'x' => 1, 'y' => 2 ]]
 * Thorin::array_intersection_with($objects, $others, 'Thorin::is_equal');
 * // [[ 'x' => 1, 'y' => 2 ]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/intersectionWith.php
 */
function array_intersection_with(...$arrays /*, callable $comparator = null*/): array {
	return \_::intersectionWith(...$arrays);
}
