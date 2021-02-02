<?php

namespace thorin;

/**
 * This method is like `Thorin::array_zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @param    {Array}    $array    The array of grouped elements to process
 * @return    {Array}    The new array of regrouped elements
 *
 * @example    php
 * $zipped = Thorin::array_zip(['a', 'b'], [1, 2], [true, false])
 * // [['a', 1, true], ['b', 2, false]]
 * Thorin::array_unzip($zipped);
 * // [['a', 'b'], [1, 2], [true, false]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/unzip.php
 */
function array_unzip(array $array): array {
	return \_::unzip($array);
}
