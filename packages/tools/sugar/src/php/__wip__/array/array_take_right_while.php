<?php

namespace thorin;

/**
 * Creates a slice of `array` with elements taken from the end. Elements are
 * taken until `predicate` returns falsey. The predicate is invoked with
 * three arguments: (value, index, array).
 *
 * @param    {Array}    $array    The array to query
 * @param    {Callable}    $predicate     The function invoked per iteration
 * @return    {Array}    The slice of `array`
 *
 * @example    php
 * $users = [
 *   [ 'user' => 'barney',  'active' => false ],
 *   [ 'user' => 'fred',    'active' => true ],
 *   [ 'user' => 'pebbles', 'active' => true ]
 * ];
 * Thorin::array_take_right_while($users, function($value) { return $value['active']; });
 * // objects for ['fred', 'pebbles']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/takeRightWhile.php
 */
function array_take_right_while(array $array, $predicate): array {
	return \_::takeRightWhile($array, $predicate);
}
