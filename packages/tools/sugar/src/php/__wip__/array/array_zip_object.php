<?php

namespace thorin;

/**
 * This method is like `Thorin::array_from_pairs` except that it accepts two arrays,
 * one of property identifiers and one of corresponding values.
 *
 * @param    {Array}    $props    The property identifiers
 * @param    {Array}    $values    The property values
 * @return    {Object}    The new object
 *
 * @example    php
 * Thorin::array_zip_object(['a', 'b'], [1, 2]);
 * /* => object(stdClass)#210 (2) {
 *   ["a"] => int(1)
 *   ["b"] => int(2)
 * }
 * *\/
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/zipObject.php
 */
function array_zip_object(array $props = [], array $values = []) {
	return \_::zipObject($props, $values);
}
