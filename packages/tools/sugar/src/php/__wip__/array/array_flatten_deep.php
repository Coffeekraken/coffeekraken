<?php

namespace thorin;

/**
 * Recursively flattens `array`.
 *
 * @param    {Array}    $array    The array to flatten
 * @return    {Array}    The new flattened array
 *
 * @example    php
 * Thorin::array_flatten_deep([1, [2, [3, [4]], 5]]);
 * // [1, 2, 3, 4, 5]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/flattenDeep.php
 */
function array_flatten_deep(array $array): array {
	return \_::flattenDeep($array);
}
