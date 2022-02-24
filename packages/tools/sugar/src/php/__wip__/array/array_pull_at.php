<?php

namespace thorin;

/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * @param    {Array}    $array    The array to process
 * @param    {Array<Integer>}    $indexes    The indexes of elements to remove
 * @return    {Array}    The new array of removed elements
 *
 * @example    php
 * $array = ['a', 'b', 'c', 'd'];
 * Thorin::array_pull_at($array, [1, 3]);
 * // ['b', 'd']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/pullAt.php
 */
function array_pull_at(array $array, $indexes): array {
	return \_::pullAt($array, $indexes);
}
