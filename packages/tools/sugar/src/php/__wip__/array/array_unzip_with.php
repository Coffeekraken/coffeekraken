<?php

namespace thorin;

/**
 * This method is like `Thorin::array_unzip` except that it accepts `iteratee` to specify
 * how regrouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @param    {Array}    $array    The array of grouped elements to process
 * @param    {Callable}    $iteratee    The function to combine regrouped values
 * @return    {Array}    The new array of regrouped elements
 *
 * @example    php
 * $zipped = Thorin::array_zip([1, 2], [10, 20], [100, 200]);
 * // [[1, 10, 100], [2, 20, 200]]
 * Thorin::array_unzip_with($zipped, 'Thorin::add');
 * // [3, 30, 300]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/unzipWith.php
 */
function array_unzip_with(array $array, ?callable $iteratee = null): array {
	return \_::unzipWith($array, $iteratee);
}
