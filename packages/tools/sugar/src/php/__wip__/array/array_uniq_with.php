<?php

namespace thorin;

/**
 * This method is like `Thorin::array_uniq` except that it accepts `comparator` which
 * is invoked to compare elements of `array`. The order of result values is
 * determined by the order they occur in the array.The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @param    {Array}    $array    The array to inspect
 * @param    {Callable}    $comparator    The comparator invoked per element
 * @return    {Array}    The new duplicate free array
 *
 * @example    php
 * $objects = [['x' => 1, 'y' => 2], ['x' => 2, 'y' => 1], ['x' => 1, 'y' => 2]];
 * Thorin::array_uniq_with($objects, 'Thorin::is_equal');
 * // [['x' => 1, 'y' => 2], ['x' => 2, 'y' => 1]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/uniqWith.php
 */
function array_uniq_with(array $array, callable $comparator): array {
	return \_::uniqWith($array, $comparator);
}
