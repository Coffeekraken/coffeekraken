<?php

namespace thorin;

/**
 * This method is like `Thorin::col_sort_by` except that it allows specifying the sort
 * orders of the iteratees to sort by. If `orders` is unspecified, all values
 * are sorted in ascending order. Otherwise, specify an order of "desc" for
 * descending or "asc" for ascending sort order of corresponding values.
 *
 * @param    {Iterable|null}    $collection    The collection to iterate over
 * @param    {Array|Callable|String}    $iteratee    The iteratee(s) to sort by
 * @param    {Array}    $orders    The sort orders of `iteratees`
 * @return    {Array}    The new sorted array
 *
 * @example    php
 * $users = [
 *   ['user' => 'fred',   'age' => 48],
 *   ['user' => 'barney', 'age' => 34],
 *   ['user' => 'fred',   'age' => 40],
 *   ['user' => 'barney', 'age' => 36]
 * ];
 * Thorin::order_by($users, ['user', 'age'], ['asc', 'desc']);
 * // [['user' => 'barney', 'age' => 36], ['user' => 'barney', 'age' => 34], ['user' => 'fred', 'age' => 48], ['user' => 'fred', 'age' => 40]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/orderBy.php
 */
function order_by(?iterable $collection, array $iteratee, array $orders):array {
	return \_::orderBy($collection, $iteratee, $orders);
}
