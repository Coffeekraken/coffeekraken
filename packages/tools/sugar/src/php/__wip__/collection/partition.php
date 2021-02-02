<?php

namespace thorin;

/**
 * Creates an array of elements split into two groups, the first of which
 * contains elements `predicate` returns truthy for, the second of which
 * contains elements `predicate` returns falsey for. The predicate is
 * invoked with one argument: (value).
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Callable}    $predicate    The function invoked per iteration
 * @return    {Array}    The array of grouped elements
 *
 * @example    php
 * $users = [
 *   ['user' => 'barney',  'age' => 36, 'active' => false],
 *   ['user' => 'fred',    'age' => 40, 'active' => true],
 *   ['user' => 'pebbles', 'age' => 1,  'active' => false]
 * ];
 * Thorin::partition($users, function($user) { return $user['active']; });
 * // objects for [['fred'], ['barney', 'pebbles']]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/partition.php
 */
function partition(iterable $collection, $predicate = null):array {
	return \_::partition($collection, $predicate);
}
