<?php

namespace thorin;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `forIn`
 * or `forOwn` for object iteration.
 *
 * @param    {Array|Iterable|Object}    $collection    The collection to iterate over
 * @param    {Callable}    $itaratee    The function invoked per iteration
 * @return    {Array|Object}    Returns `collection`
 *
 * @example    php
 * Thorin::each([1, 2], function ($value) { echo $value; });
 * // Echoes `1` then `2`.
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/each.php
 */
function each($collection, callable $iteratee) {
	return \_::each($collection, $iteratee);
}
