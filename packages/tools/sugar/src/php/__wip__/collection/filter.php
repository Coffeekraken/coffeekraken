<?php

namespace thorin;

/**
 * Iterates over elements of `array`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index, array).
 *
 * @param    {Iterable}    $array    The array to iterate over
 * @param    {Callable}    $predicate    The function invoked per iteration
 * @return    {Array}    The new filtered array
 *
 * @example    php
 * $users = [
 *     [ 'user' => 'barney', 'age' => 36, 'active' => true],
 *     [ 'user' => 'fred',   'age' => 40, 'active' => false]
 * ];
 * Thorin::filter($users, function($o) { return !$o['active']; });
 * // objects for ['fred']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/filter.php
 */
function filter(iterable $array, $predicate = null) {
	return \_::filter($array, $predicate);
}
