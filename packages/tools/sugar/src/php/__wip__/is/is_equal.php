<?php

namespace thorin;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, booleans,
 * DateTime objects, exception objects, SPLObjectStorage, numbers,
 * strings, typed arrays, resources, DOM Nodes. objects are compared
 * by their own, not inherited, enumerable properties.
 *
 * @param    {Mixed}    $value    The value to compare
 * @param    {Mixed}    $other    The other value to compare
 * @return    {Boolean}    true if equivalent, false if not
 *
 * @example    php
 * Thorin::is_equal([ 'a' => 1], ['a' => '1'])
 * // true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Lang/isEqual.php
 */
function is_equal($value, $other) {
	return \_::isEqual($value, $other);
}
