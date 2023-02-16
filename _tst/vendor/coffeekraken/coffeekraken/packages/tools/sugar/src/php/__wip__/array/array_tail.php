<?php

namespace thorin;

/**
 * Returns all elements in an array except for the first one.
 * @param    {Array}    $items    The array to process
 * @return    {Array}    All the items except the first one
 *
 * @example    php
 * Thorin::array_tail([1,2,3]);
 * // [2,3]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_tail($items) {
    return count($items) > 1 ? \array_slice($items, 1) : $items;
}
