<?php

namespace thorin;

/**
 * This method is like `Thorin::array_union` except that it accepts `iteratee` which is
 * invoked for each element of each `arrays` to generate the criterion by
 * which uniqueness is computed. Result values are chosen from the first
 * array in which the value occurs. The iteratee is invoked with one argument:
 * (value).
 *
 * @param    {Array}    ...$arrays    The arrays to inspect
 * @param    {Callable}    $iteratee    The iteratee invoked per element
 * @return    {Array}    The new array of combined values
 *
 * @example    php
 * Thorin::array_union_by([2.1], [1.2, 2.3], 'floor');
 * // [2.1, 1.2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/unionBy.php
 */
function array_union_by(...$arrays): array {
	return \_::unionBy(...$arrays);
}
