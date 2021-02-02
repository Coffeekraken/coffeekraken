<?php

namespace thorin;

/**
 * Creates an array of grouped elements, the first of which contains the
 * first elements of the given arrays, the second of which contains the
 * second elements of the given arrays, and so on.
 *
 * @param    {Array}    ...$arrays    The arrays to process
 * @return    {Array}    The new array of grouped elements
 *
 * @example    php
 * Thorin::array_zip(['a', 'b'], [1, 2], [true, false]);
 * // [['a', 1, true], ['b', 2, false]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/zip.php
 */
function array_zip(array ...$arrays): array {
	return \_::zip(...$arrays);
}
