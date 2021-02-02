<?php

namespace thorin;

/**
 * Returns true if the provided function returns true for at least one element of an array, false otherwise.
 * @param    {Array}    $items    The array to process
 * @param    {Callable}    $func    The test function to run on each items
 * @return    {Boolean}    true if at least one item pass the test function, false if not
 *
 * @example    php
 * if (Thorin::array_any([1,10,15,20], function($item) {
 *   return $item < 10;
 * })) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_any(array $items, callable $func) {
    return count(array_filter($items, $func)) > 0;
}
