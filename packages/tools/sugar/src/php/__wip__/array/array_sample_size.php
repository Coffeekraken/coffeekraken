<?php

namespace thorin;

/**
 * Gets `n` random elements at unique keys from `array` up to the
 * size of `array`.
 *
 * @param    {Array}    $array    The array to sample
 * @param    {Integer}    [$n=1]    The number of elements to sample
 * @return    {Array}    The random elements
 *
 * @example    php
 * Thorin::array_sample_size([1, 2, 3], 2);
 * // [1,3]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/sampleSize.php
 */
function array_sample_size(array $array, int $n = 1):array {
	return \_::sampleSize($array, $n);
}
