<?php

namespace thorin;

/**
 * The opposite of `Thorin::col_filter` this method returns the elements of `collection`
 * that `predicate` does **not** return truthy for.
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Callable}    $predicate    The function invoked per iteration
 * @return    {Array}    The new filtered array
 *
 * @example    php
 * $users = [
 *   ['user' => 'barney', 'active' => true],
 *   ['user' => 'fred',   'active' => false]
 * ];
 * Thorin::reject($users, 'active');
 * // objects for ['fred']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/reject.php
 */
function reject(iterable $collection, $predicate = null):array {
	return \_::reject($collection, $predicate);
}
