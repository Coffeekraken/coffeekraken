<?php

namespace thorin;

/**
 * Creates a slice of `array` excluding elements dropped from the beginning.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @param    {Array}    $array    The array to process
 * @param    {Callable}    $predicate    The function invoked per iteration
 * @return    {Array}    The slice of `array`
 *
 * @example    php
 * $users = [
 *   [ 'user' => 'barney',  'active' => true ],
 *   [ 'user' => 'fred',    'active' => true ],
 *   [ 'user' => 'pebbles', 'active' => false ]
 * ]
 * Thorin::array_drop_left_while($users, function($user) { return $user['active']; })
 * // objects for ['pebbles']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/dropWhile.php
 */
function array_drop_while(array $array, callable $predicate): array {
	return \_::dropWhile($array, $predicate);
}
