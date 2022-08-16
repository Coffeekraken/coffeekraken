<?php

namespace thorin;

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Mixed}    $iteratee    The function invoked per iteration
 * @param    {Mixed}    [$accumulator=null]    The initial value
 * @return    {Mixed}    The accumulated value
 *
 * @example    php
 * Thorin::reduce(['a' => 1, 'b' => 2, 'c' => 1], function ($result, $value, $key) {
 *     if (!isset($result[$value])) {
 *         $result[$value] = [];
 *     }
 *     $result[$value][] = $key;
 *     return $result;
 *  }, []);
 * // ['1' => ['a', 'c'], '2' => ['b']] (iteration order is not guaranteed)
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/reduce.php
 */
function reduce(iterable $collection, $iteratee, $accumulator = null) {
	return \_::reduce($collection, $iteratee, $accumulator);
}
