<?php

namespace thorin;

/**
 * Filters out the elements of an array, that have one of the specified values.
 * @param    {Array}    $item    The array to process
 * @param    {Mixed}    $params...    The values to exclude from the array
 * @return    {Array}    The newly filtered array
 *
 * @example    php
 * Thorin::array_without([1,2,3,4,5], 1, 3);
 * // [2,4,5]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_without($items, ...$params) {
    return \array_values(\array_diff($items, $params));
}
