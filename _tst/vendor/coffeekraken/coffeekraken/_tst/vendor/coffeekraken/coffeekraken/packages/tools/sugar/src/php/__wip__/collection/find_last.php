<?php

namespace thorin;

/**
 * This method is like `Thorin::col_find` except that it iterates over elements of
 * `collection` from right to left.
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
 * Thorin::find_last($users, function($o) { return $o['age'] < 40; });
 * // object for 'pebbles'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/find.php
 */
function find_last(iterable $collection, $predicate = null, int $fromIndex = 0) {
	return \_::findLast($collection, $predicate, $fromIndex);
}
