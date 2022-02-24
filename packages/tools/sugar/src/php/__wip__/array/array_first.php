<?php

namespace thorin;

/**
 * Returns the first item of a list.
 * @param    {Array}    $items    The array to process
 * @return    {Mixed}    The first item of the list
 *
 * @example    php
 * Thorin::array_first([1,2,3,4]);
 * // 1
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_first($items) {
    return \reset($items);
}
