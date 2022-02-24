<?php

namespace thorin;

/**
 * Returns the last element for which the provided function returns a truthy value.
 * @param    {Array}    $items    The array to process
 * @param    {Callable}    $func    The test function to call on each item
 * @return    {Mixed}    The last element that pass the test function
 *
 * @example    php
 * Thorin::array_find_last([1, 2, 3, 4], function($item) {
 *   return ($n % 2) === 1;
 * });
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_find_last($items, $func) {
    $filteredItems = \array_filter($items, $func);
    return \array_pop($filteredItems);
}
