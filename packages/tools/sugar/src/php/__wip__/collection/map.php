<?php

namespace thorin;

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * @param    {Array|Object}    $collection    The collection to iterate over
 * @param    {Callable|String|Array}    $iteratee    The function invoked per iteration
 * @return    {Array}    The new mapped array
 *
 * @example    php
 * function square(int $n) {
 *   return $n * $n;
 * }
 * Thorin::map([4, 8], 'square');
 * // [16, 64]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/map.php
 */
function map($collection, $iteratee):array {
	return \_::map($collection, $iteratee);
}
