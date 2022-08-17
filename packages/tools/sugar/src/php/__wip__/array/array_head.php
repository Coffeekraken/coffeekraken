<?php

namespace thorin;

/**
 * Returns all elements in an array except for the last one.
 * @param    {Array}    $items    The array to process
 * @return    {Array}    All the items except the last one
 *
 * @example    php
 * Thorin::array_head([1,2,3]);
 * // [1,2]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_head($items) {
    return count($items) > 1 ? \array_slice($items, 0, -1) : $items;
}
