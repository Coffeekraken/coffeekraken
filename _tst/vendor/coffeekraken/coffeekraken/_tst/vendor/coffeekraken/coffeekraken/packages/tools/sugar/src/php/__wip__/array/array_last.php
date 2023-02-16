<?php

namespace thorin;

/**
 * Returns the last element in an array.
 * @param     {Array}    $items    The array to process
 * @return    {Mixed}    The last item of the list
 *
 * @example    php
 * Thorin::array_last([1,2,3,4]);
 * // 4
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_last($items) {
    return \end($items);
}
