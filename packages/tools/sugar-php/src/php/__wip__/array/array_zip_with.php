<?php

namespace thorin;

/**
 * This method is like `Thorin::array_zip` except that it accepts `iteratee` to specify
 * how grouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @param    {Array}    ...$arrays    The arrays to process
 * @param    {Callable}    $iteratee    The function to combine grouped values
 * @return    {Array}    the new array of grouped elements
 *
 * @example    php
 * Thorin::array_zip_with([1, 2], [10, 20], [100, 200], function($a, $b, $c) { return $a + $b + $c; });
 * // [111, 222]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/zipWith.php
 */
function array_zip_with(...$arrays): array {
	return \_::zipWith(...$arrays);
}
