<?php

namespace thorin;

/**
 * Creates an array of shuffled values
 *
 * @param    {Array}    $array    The array to shuffle
 * @return    {Array}    The new shuffled array
 *
 * @example    php
 * Thorin::array_shuffle([1, 2, 3, 4]);
 * // [4, 1, 3, 2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/shuffle.php
 */
function array_shuffle(array $array = []):array {
	return \_::shuffle($array);
}
