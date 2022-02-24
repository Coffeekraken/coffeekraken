<?php

namespace thorin;

/**
 * This method is like `flatMap` except that it recursively flattens the
 * mapped results up to `depth` times.
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Callable}    $iteratee    The function invoked per iteration
 * @param    {Integer}    [$depth=1]    The maximum recursion depth
 *
 * @example    php
 * function duplicate($n) {
 *   return [[[$n, $n]]];
 * }
 * Thorin::flat_map_depth([1, 2], 'duplicate', 2);
 * // [[1, 1], [2, 2]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/flatMapDepth.php
 */
function flat_map_depth(iterable $collection, callable $iteratee, int $depth = 1):array {
	return \_::flatMapDepth($collection, $iteratee, $depth);
}
