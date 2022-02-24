<?php

namespace thorin;

/**
 * Creates an array composed of keys generated from the results of running
 * each element of `collection` through `iteratee`. The corresponding value of
 * each key is the number of times the key was returned by `iteratee`. The
 * iteratee is invoked with one argument: (value).
 *
 * @param    {Iterable}    $collection    The collection to iterate over
 * @param    {Callable}    $iteratee    The iteratee to transform keys
 * @return    {Array}    Returns the composed aggregate object
 *
 * @example    php
 * Thorin::count_by([6.1, 4.2, 6.3], 'floor'));
 * // ['6' => 2, '4' => 1]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/countBy.php
 */
function count_by(iterable $collection, callable $iteratee): array {
	return \_::countBy($collection, $iteratee);
}
