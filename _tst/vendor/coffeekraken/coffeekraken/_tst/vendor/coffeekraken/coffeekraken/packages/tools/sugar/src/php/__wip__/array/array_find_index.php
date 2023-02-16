<?php

namespace thorin;

/**
 * This method is like `Thorin::array_find` except that it returns the index of the first element predicate returns truthy for instead of the element itself.
 *
 * @param    {Array}    $array    The array to process
 * @param    {Callable}    $predicate    The function invoked per iteration
 * @param    {Integer}    [$fromIndex=null]    The index to search from
 * @return    {Integer}    The index of the found element, otherwise -1
 *
 * @example    php
 * $users = [
 *     ['user' => 'barney',  'active' => false],
 *     ['user' => 'fred',    'active' => false],
 *     ['user' => 'pebbles', 'active' => true],
 * ];
 * Thorin::array_find_index($users, function($o) { return $o['user'] == 'barney'; });
 * // 0
 * Thorin::array_find_index($users, ['user' => 'fred', 'active' => false]);
 * // 1
 * Thorin::array_find_index($users, ['active', false]);
 * // 0
 * Thorin::array_find_index($users, 'active');
 * // 2
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/findIndex.php
 */
function array_find_index(array $array, $predicate, int $fromIndex = null): int {
	return \_::findIndex($array, $predicate, $fromIndex);
}
