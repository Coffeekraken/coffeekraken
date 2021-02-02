<?php

namespace thorin;

/**
 * Creates a function that negates the result of the predicate `func`
 *
 * @param    {Callable}    $predicate    The predicate to negate
 * @return    {Callable}    The new negated function
 *
 * @example    php
 * function isEven($n) {
 *   return $n % 2 == 0;
 * }
 * Thorin::filter([1, 2, 3, 4, 5, 6], Thorin::negate($isEven));
 * // [1, 3, 5]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Function/negate.php
 */
function negate(callable $predicate):callable {
	return \_::negate($predicate);
}
