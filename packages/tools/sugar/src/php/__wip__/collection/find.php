<?php

namespace thorin;

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * @param    {Itarable}    $collection    The collection to inspect
 * @param    {Callable}    $predicate    The function invoked per iteration
 * @param    {Integer}    [$fromIndex=0]    The index to search from
 * @return    {Mixed}    Returns the matched element, else `null`
 *
 * @example    php
 * $users = [
 *     ['user' => 'barney',  'age' => 36, 'active' => true],
 *     ['user' => 'fred',    'age' => 40, 'active' => false],
 *     ['user' => 'pebbles', 'age' => 1,  'active' => true]
 * ];
 * Thorin::find($users, function($o) { return $o['age'] < 40; });
 * // object for 'barney'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/find.php
 */
function find(iterable $collection, $predicate = null, int $fromIndex = 0) {
	return \_::find($collection, $predicate, $fromIndex);
}
