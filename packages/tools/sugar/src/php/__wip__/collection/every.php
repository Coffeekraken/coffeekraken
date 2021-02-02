<?php

namespace thorin;

/**
 * Checks if `predicate` returns truthy for **all** elements of `array`.
 * Iteration is stopped once `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * **Note:** This method returns `true` for
 * [empty arrays](https://en.wikipedia.org/wiki/Empty_set) because
 * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
 * elements of empty arrays.
 *
 * @param    {Iterable}    $collection    The array to iterate over
 * @param    {Callable}    $predicate    The function invoked per iteration
 * @return    {Boolean}    `true` if all elements pass the predicate check, else `false`
 *
 * @example    php
 * Thorin::every([true, 1, null, 'yes'], function ($value) { return is_bool($value);});
 * // false
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/every.php
 */
function every(iterable $collection, $predicate): bool {
	return \_::every($collection, $predicate);
}
