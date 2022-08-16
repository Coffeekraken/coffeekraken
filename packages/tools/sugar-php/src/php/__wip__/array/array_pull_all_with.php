<?php

namespace thorin;

/**
 * This method is like `Thorin::array_pull_all` except that it accepts `comparator` which
 * is invoked to compare elements of `array` to `values`. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * @param    {Array}    $array    The array to modify
 * @param    {Array}    $values    The values to remove
 * @param    {Callable}    $comparator    The comparator invoked per element
 * @return    {Array}    The mutated array
 *
 * @example    php
 * $array = [[ 'x' => 1, 'y' => 2 ], [ 'x' => 3, 'y' => 4 ], [ 'x' => 5, 'y' => 6 ]];
 * Thorin::array_pull_all_with($array, [[ 'x' => 3, 'y' => 4 ]], 'Thorin::is_equal');
 * // [[ 'x' => 1, 'y' => 2 ], [ 'x' => 5, 'y' => 6 ]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/pullAllWith.php
 */
function array_pull_all_with(array $array, array $values, callable $comparator): array {
	return \_::pullAllWith($array, $values, $comparator);
}
