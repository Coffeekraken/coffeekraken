<?php

namespace thorin;

/**
 * This method is like `flatMap` except that it recursively flattens the
 * mapped results.
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Callable}    $iteratee    The function invoked per iteration
 * @return    {Array}    The new flattened array
 *
 * @example    php
 * function duplicate($n) {
 *   return [[[$n, $n]]];
 * }
 * Thorin::flat_map_deep([1, 2], 'duplicate');
 * // [1, 1, 2, 2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/flatMapDeep.php
 */
function flat_map_deep(iterable $collection, callable $iteratee):array {
	return \_::flatMapDeep($collection, $iteratee);
}
