<?php

namespace thorin;

/**
 * This method is like `Thorin::array_uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @param    {Array}    $array    The array to inspect
 * @param    {Callable}    $iteratee    The iteratee invoked per element
 * @return    {Array}    The new duplicate free array
 *
 * @example    php
 * Thorin::array_uniq_by([2.1, 1.2, 2.3], 'floor');
 * // [2.1, 1.2]
 *
 * @author    Olivier Bossel <olivier.bosel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/uniqBy.php
 */
function array_uniq_by(array $array, $iteratee): array {
	return \_::uniqBy($array, $iteratee);
}
