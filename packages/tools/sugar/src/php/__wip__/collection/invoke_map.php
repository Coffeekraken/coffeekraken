<?php

namespace thorin;

/**
 * Invokes the method at `path` of each element in `collection`, returning
 * an array of the results of each invoked method. Any additional arguments
 * are provided to each invoked method. If `path` is a function, it's invoked
 * for, and `this` bound to, each element in `collection`.
 *
 * @param    {Itarable}    $collection    The collection to iterate over
 * @param    {Array|Callable|String}    $path    The path of the method to invoke or the function invoked per iteration
 * @param    {Array}    [$args=[]]    The arguments to invoke each method with
 *
 * @example    php
 * Thorin::invoke_map([[5, 1, 7], [3, 2, 1]], function($result) { sort($result); return $result;});
 * // [[1, 5, 7], [1, 2, 3]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/invokeMap.php
 */
function invoke_map(iterable $collection, $path, array $args = []):array {
	return \_::invokeMap($collection, $path, $args);
}
