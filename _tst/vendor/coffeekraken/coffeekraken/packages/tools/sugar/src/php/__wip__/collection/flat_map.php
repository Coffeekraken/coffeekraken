<?php

namespace thorin;

/**
 * Creates a flattened array of values by running each element in `collection`
 * through `iteratee` and flattening the mapped results. The iteratee is invoked
 * with three arguments: (value, index|key, collection).
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Callable}    $iteratee    The function invoked per iteration
 * @return    {Array}    The new flattened array
 *
 * @example    php
 * function duplicate($n) {
 *   return [$n, $n]
 * }
 * Thorin::flat_map([1, 2], 'duplicate');
 * // [1, 1, 2, 2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/flatMap.php
 */
function flat_map(iterable $collection, callable $iteratee):array {
	return \_::flatMap($collection, $iteratee);
}
