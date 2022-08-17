<?php

namespace thorin;

/**
 * Creates a slice of `array` excluding elements dropped from the end.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @param    {Array}    $array    The array to process
 * @param    {Callable}    $predicate    The function invoked per iteration
 * @return    {Array}    The slice of `array`
 *
 * @example    php
 * $users = [
 *   [ 'user' => 'barney',  'active' => false ],
 *   [ 'user' => 'fred',    'active' => true ],
 *   [ 'user' => 'pebbles', 'active' => true ]
 * ]
 * Thorin::array_drop_right_while($users, function($user) { return $user['active']; })
 * // objects for ['barney']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/dropRightWhile.php
 */
function array_drop_right_while(array $array, callable $predicate): array {
	return \_::dropRightWhile($array, $predicate);
}
