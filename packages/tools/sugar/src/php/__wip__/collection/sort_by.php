<?php

namespace thorin;

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection through each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @param    {Array|Object}    $collection    The collection to iterate over
 * @param    {Callable|Callable[]}    $iteratees    The iteratees to sort by
 * @return    {Array}    The new sorted array
 *
 * @example    php
 * $users = [
 *   [ 'user' => 'fred',   'age' => 48 ],
 *   [ 'user' => 'barney', 'age' => 36 ],
 *   [ 'user' => 'fred',   'age' => 40 ],
 *   [ 'user' => 'barney', 'age' => 34 ],
 * ];
 * Thorin::sort_by($users, [function($o) { return $o['user']; }]);
 * // [['user' => 'barney', 'age' => 36], ['user' => 'barney', 'age' => 34], ['user' => 'fred', 'age' => 48], ['user' => 'fred', 'age' => 40]]
 *
 * Thorin::sort_by($users, ['user', 'age']);
 * // [['user' => 'barney', 'age' => 34], ['user' => 'barney', 'age' => 36], ['user' => 'fred', 'age' => 40], ['user' => 'fred', 'age' => 48]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/sortBy.php
 */
function sort_by($collection, $iteratees):array {
	return \_::sortBy($collection, $iteratees);
}
