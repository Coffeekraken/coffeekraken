<?php

namespace thorin;

/**
 * Chunks an array into smaller arrays of a specified size
 * @param    {Array}    $items    The array to process
 * @param    {Integer}    $size    The size to chunk the array with
 * @return    {Array}    An array of smaller arrays
 *
 * @example    php
 * Thorin::array_chunk([1,2,3,4,5], 2);
 * // [[1, 2], [3, 4], [5]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_chunk($items, $size) {
    return \array_chunk($items, $size);
}
