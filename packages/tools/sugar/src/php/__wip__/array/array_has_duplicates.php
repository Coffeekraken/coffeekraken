<?php

namespace thorin;

/**
 * Checks a flat list for duplicate values. Returns true if duplicate values exists and false if values are all unique.
 * @param    {Array}    $items    The array to check for duplicates
 * @return    {Boolean}    true if has duplicates, false if not
 *
 * @example    php
 * Thorin::array_has_duplicates([1,2,3,1,2]);
 * // true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_has_duplicates($items) {
    return count($items) > count(\array_unique($items));
}
