<?php

namespace thorin;

/**
 * This method is like `Thorin::array_difference` except that it accepts `comparator`
 * which is invoked to compare elements of `array` to `values`. The order and
 * references of result values are determined by the first array. The comparator
 * is invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `Thorin::pull_all_with`, this method returns a new array.
 *
 * @param    {Array}    $array    The array to inspect
 * @param    {Array}    ...$values    The values to exclude
 * @param    {Callable}    $comparator    The comparator invoked per element
 * @return    {Array}    The new array of filtered values
 *
 * @example    php
 * Thorin::array_difference_with(
 *   [[ 'x' => 1, 'y' => 2 ], [ 'x' => 2, 'y' => 1 ]],
 *   [[ 'x' => 1, 'y' => 2 ]],
 *   'Thorin::is_equal'
 * );
 * // [[ 'x' => 2, 'y' => 1 ]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/differenceWith.php
 */
function array_difference_with(array $array, ...$values): array {
	return \_::differenceWith($array, ...$values);
}
