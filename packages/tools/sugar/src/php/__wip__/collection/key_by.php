<?php

namespace thorin;

/**
 * Creates an object composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value of
 * each key is the last element responsible for generating the key. The
 * iteratee is invoked with one argument: (value).
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Callable}    $iteratee    The iteratee to transform keys
 * @return    {Array}    The composed aggregate object
 *
 * @example    php
 * $array = [
 *   ['direction' => 'left', 'code' => 97],
 *   ['direction' => 'right', 'code' => 100],
 * ];
 * Thorin::key_by($array, function ($o) { return \chr($o['code']); });
 * // ['a' => ['direction' => 'left', 'code' => 97], 'd' => ['direction' => 'right', 'code' => 100]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/keyBy.php
 */
function key_by(iterable $collection, $iteratee):array {
	return \_::keyBy($collection, $iteratee);
}
