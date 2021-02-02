<?php

namespace thorin;

/**
 * Gets a random element from `array`
 *
 * @param     {Array}    $array    The array to sample
 * @return    {Mixed}    The random element
 *
 * @example    php
 * Thorin::array_sample([1,2,3,4,5]);
 * // 2
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/sample.php
 */
function array_sample(array $array) {
	return \_::sample($array);
}
