<?php

namespace thorin;

/**
 * Recursively flatten `array` up to `depth` times.
 *
 * @param    {Array}    $array    The array to flatten
 * @param    {Integer}    $depth    The maximum recursion depth
 * @return    {Array}    The new flattened array
 *
 * @example    php
 * $array = [1, [2, [3, [4]], 5]]
 * Thorin::array_flatten_depth($array, 1);
 * // [1, 2, [3, [4]], 5]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/flattenDepth.php
 */
function array_flatten_depth(array $array, int $depth = 1): array {
	return \_::flattenDepth($array, $depth);
}
