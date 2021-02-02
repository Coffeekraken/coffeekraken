<?php

namespace thorin;

/**
 * Returns the index of the last element for which the provided function returns a truthy value.
 * @param    {Array}    $items    The array to process
 * @param    {Callable}    $fund    The test function to run on every items
 * @return    {Integer}    The index of the last element for which the provided function returns a truthy value.
 *
 * @example    php
 * Thorin::array_find_last_index([1, 2, 3, 4], function($n) {
 *   return ($n % 2) === 1;
 * });
 * // 2
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code#findlastindex
 */
function array_find_last_index($items, $func) {
    $keys = \array_keys(\array_filter($items, $func));
    return \array_pop($keys);
}
