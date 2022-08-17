<?php

namespace thorin;

/**
 * Returns an array with n elements taken from the beginning
 * @param    {Array}    $items    The array from which to take items
 * @param    {Integer}    $n    How many items to take
 * @return    {Array}    The taken items
 *
 * @example    php
 * Thorin::array_take([1,2,3,4,5], 2);
 * // [1,2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_take($items, $n = 1) {
    return \array_slice($items, 0, $n);
}
