<?php

namespace thorin;

/**
 * Creates an array composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The order of grouped values
 * is determined by the order they occur in `collection`. The corresponding
 * value of each key is an array of elements responsible for generating the
 * key. The iteratee is invoked with one argument: (value).
 *
 * @param    {Itarable}     $collection    The collection to iterate over
 * @param    {Callable}    $iteratee    The iteratee to transform keys
 * @return    {Array}    The composed aggregate object
 *
 * @example    php
 * Thorin::group_by([6.1, 4.2, 6.3], 'floor');
 * // ['6' => [6.1, 6.3], '4' => [4.2]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/groupBy.php
 */
function group_by(iterable $collection, $iteratee):array {
	return \_::groupBy($collection, $iteratee);
}
