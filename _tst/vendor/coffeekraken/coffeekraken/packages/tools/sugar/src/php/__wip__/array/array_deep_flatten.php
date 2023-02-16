<?php

namespace thorin;

/**
 * Deep flattens an array
 * @param    {Array}   $items    The array to flatten
 * @return    {Array}    The flatten array
 *
 * @example    php
 * Thorin::array_deep_flatten([1, [2], [[3], 4], 5]);
 * // [1, 2, 3, 4, 5]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_deep_flatten($items) {
    $result = [];
    foreach ($items as $item) {
        if (!is_array($item)) {
            $result[] = $item;
        } else {
            $result = array_merge($result, array_deep_flatten($item));
        }
    }
    return $result;
}
