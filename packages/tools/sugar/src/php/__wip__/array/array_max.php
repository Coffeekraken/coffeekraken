<?php

namespace thorin;

/**
 * Computes the maximum value of `array`. If `array` is empty or falsey, null is returned.
 *
 * @param    {Array}    $array    The array to iterate over
 * @return    {Integer|null}    The maximum value
 *
 * @example    php
 * Thorin::array_max([4, 2, 8, 6]);
 * // 8
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Math/max.php
 */
function array_max(?array $array):?int {
	return \_::max($array);
}
