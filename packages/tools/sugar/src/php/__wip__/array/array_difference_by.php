<?php

namespace thorin;

/**
 * This method is like `array_difference` except that it accepts `iteratee` which
 * is invoked for each element of `array` and `values` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * **Note:** Unlike `array_pull_all_by`, this method returns a new array.
 *
 * @param    {Array}    $array    The array to inspect
 * @param    {Array}    ...$values    The values to exclude
 * @param    {Callable}    $iteratee    The iteratee invoked per element
 * @return    {Array}    The new array of filtered values
 *
 * @example    php
 * Thorin::array_difference_by([2.1, 1.2], [2.3, 3.4], 'floor');
 * // [1.2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/differenceBy.php
 */
function array_difference_by(array $array, ...$values): array {
	return \_::differenceBy($array, ...$values);
}
