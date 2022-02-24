<?php

namespace thorin;

/**
 * Returns true if the provided function returns true for all elements of an array, false otherwise
 * @param    {Array}    $items    The array to process
 * @param    {Callable}    $func    The function to call on each item
 *
 * @example    php
 * if (Thorin::array_all([1,2,3,4], function($item) {
 *   return $item < 10;
 * })) {
 *    // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_all(array $items, callable $func) {
    return count(array_filter($items, $func)) === count($items);
}
