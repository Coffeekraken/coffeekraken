<?php

namespace thorin;

/**
 * This method is like `Thorin::col_reduce` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Mixed}    $iteratee    The function invoked per iteration
 * @param    {Mixed}    [$accumulator=null]    The initial value
 * @return    {Mixed}    The accumulated value
 *
 * @example   php
 * Thorin::reduce_right(['a' => 1, 'b' => 2, 'c' => 1], function ($result, $value, $key) {
 *     if (!isset($result[$value])) {
 *         $result[$value] = [];
 *     }
 *     $result[$value][] = $key;
 *     return $result;
 *  }, []);
 * // ['1' => ['c', 'a'], '2' => ['b']] (iteration order is not guaranteed)
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/reduceRight.php
 */
function reduce_right(iterable $collection, $iteratee, $accumulator = null) {
	return \_::reduceRight($collection, $iteratee, $accumulator);
}
