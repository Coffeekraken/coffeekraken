<?php

namespace thorin;

/**
 * This method is like `Thorin::array_union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. Result values are chosen from
 * the first array in which the value occurs. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @param    {Array}    ...$arrays    The arrays to inspect
 * @param    {Callable}    $comparator    The comparator invoked per element
 * @return    {Array}    The new array of combined values
 *
 * @example    php
 * $objects = [['x' => 1, 'y' => 2], ['x' => 2, 'y' => 1]];
 * $others = [['x' => 1, 'y' => 1], ['x' => 1, 'y' => 2]];
 * Thorin::array_union_with($objects, $others, 'Thorin::is_equal')
 * // => [['x' => 1, 'y' => 2], ['x' => 2, 'y' => 1], ['x' => 1, 'y' => 1]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/unionWith.php
 */
function array_union_with(...$arrays): array {
	return \_::unionWith(...$arrays);
}
