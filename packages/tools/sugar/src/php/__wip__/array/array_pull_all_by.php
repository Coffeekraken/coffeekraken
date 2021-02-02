<?php

namespace thorin;

/**
 * This method is like `Thorin::array_pull_all` except that it accepts `iteratee` which is
 * invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The iteratee is invoked with one argument: (value).
 *
 * @param    {Array}    $array    The array to modify
 * @param    {Array}    $values    The values to remove
 * @param    {Callable}    $iteratee    The iteratee invoked per element
 * @return    {Array}    The mutated array
 *
 * @example    php
 * $array = [[ 'x' => 1 ], [ 'x' => 2 ], [ 'x' => 3 ], [ 'x' => 1 ]];
 * Thorin::array_pull_all_by($array, [[ 'x' => 1 ], [ 'x' => 3 ]], 'x');
 * var_dump($array);
 * // [[ 'x' => 2 ]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/pullAllBy.php
 */
function array_pull_all_by(array $array, array $values, $iteratee): array {
	return \_::pullAllBy($array, $values, $iteratee);
}
