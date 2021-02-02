<?php

namespace thorin;

/**
 * Creates a slice of `array` with `n` elements taken from the end.
 *
 * @param    {Array}    $array    The array to process
 * @param    {Integer}    $n     The number of elements to take
 * @return    {Array}    The slice of `array`
 *
 * @example    php
 * Thorin::array_take_right([1, 2, 3], 2);
 * // [2,3]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/takeRight.php
 */
function array_take_right(array $array, int $n = 1): array {
	return \_::takeRight($array, $n);
}
