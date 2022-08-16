<?php

namespace thorin;

/**
 * Performs a comparison between two values to determine if they are equivalent
 *
 * @param    {Mixed}    $value    The value to compare
 * @param    {Mixed}    $other    The other value to compare
 * @return    {Boolean}    `true` if the values are equivalent, else `false`
 *
 * @example    php
 * Thorin::eq(['a' => 1], ['a' => 1]);
 * // true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Lang/eq.php
 */
function eq($value, $other):bool {
	return \_::eq($value, $other);
}
