<?php

namespace thorin;

/**
 * This method is like `Thorin::array_intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @param    {Array}    ...$arrays    The arrays to process
 * @param    {Callable}    $iteratee    The iteratee invoked per element
 * @return    {Array}    The new array of intersecting values
 *
 * @example    php
 * Thorin::array_intersection_by([2.1, 1.2], [2.3, 3.4], Math.floor);
 * // [2.1]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/intersectionBy.php
 */
function array_intersection_by(...$arrays/*, callable $iteratee*/): array {
	return \_::intersectionBy(...$arrays);
}
