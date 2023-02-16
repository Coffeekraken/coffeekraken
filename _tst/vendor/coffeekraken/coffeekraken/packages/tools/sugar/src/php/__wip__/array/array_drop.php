<?php

namespace thorin;

/**
 * Returns a new array with n elements removed from the left
 * @param    {Array}    $items    The array to process
 * @param    {Integer}    [$n=1]    How many items to drop
 * @return    {Array}    The new array produced
 *
 * @example    php
 * Thorin::array_drop([1,2,3], 2) // [3]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_drop($items, $n = 1) {
    return \array_slice($items, $n);
}
