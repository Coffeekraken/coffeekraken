<?php

namespace thorin;

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Callable|String|Array}    $predicate    The function invoked per iteration
 * @return    {Boolean}    `true` if any element passes the predicate check, else `false`
 *
 * @example    php
 * Thorin::some([null, 0, 'yes', false], , function ($value) { return \is_bool($value); }));
 * // true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/some.php
 */
function some(iterable $collection, $predicate = null):bool {
	return \_::some($collection, $predicate);
}
