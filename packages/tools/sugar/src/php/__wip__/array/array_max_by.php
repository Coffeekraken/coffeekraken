<?php

namespace thorin;

/**
 * This method is like `Thorin::array_max` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @param    {Array}    $array    The array to iterate over
 * @param    {Callable|String}    $iteratee    The iteratee invoked per element
 * @return    {Mixed}    The maximum value
 *
 * @example    php
 * $objects = [['n' => 1], ['n' => 2]];
 * Thorin::array_max_by($objects, function($o) { return $o['n']; });
 * // ['n' => 2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Math/maxBy.php
 */
function array_max_by(?array $array, $iteratee) {
	return \_::maxBy($array, $iteratee);
}
