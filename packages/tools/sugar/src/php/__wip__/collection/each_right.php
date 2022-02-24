<?php

namespace thorin;

/**
 * This method is like `Thorin::col_each` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @param    {Array|Iterable|Object}    $collection    The collection to iterate over
 * @param    {Callable}    $iteratee    The function invoked per iteration
 * @return    {Array|Object}    Returns `collection`
 *
 * @example    php
 * Thorin::each_right([1, 2], function($value) { echo $value; })
 * // Echoes `2` then `1`
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/eachRight.php
 */
function each_right($collection, callable $iteratee) {
	return \_::eachRight($collection, $iteratee);
}
