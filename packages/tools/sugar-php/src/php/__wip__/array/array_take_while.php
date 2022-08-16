<?php

namespace thorin;

/**
 * Creates a slice of `array` with elements taken from the beginning. Elements
 * are taken until `predicate` returns falsey. The predicate is invoked with
 * three arguments: (value, index, array)
 *
 * @param    {Array}    $array    The array to query
 * @param    {Callable}    $predicate    The predicte invoked per iteration
 * @return    {Array}    The slice of `array`
 *
 * @example    php
 * $users = [
 *   [ 'user' => 'barney',  'active' => true ],
 *   [ 'user' => 'fred',    'active' => true ],
 *   [ 'user' => 'pebbles', 'active' => false ]
 * ];
 * Thorin::array_take_while($users, function($value) { return $value['active']; });
 * // objects for ['barney', 'fred']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/takeWhile.php
 */
function array_take_while(array $array, $predicate): array {
	return \_::takeWhile($array, $predicate);
}
