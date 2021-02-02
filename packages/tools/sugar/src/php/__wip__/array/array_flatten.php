<?php

namespace thorin;

/**
 * Flattens an array up to the one level depth.
 * @param    {Array}    $items    The array to process
 * @return    {Array}    The flatten array
 *
 * @example    php
 * Thorin::array_flatten([1, [2], 3, 4]);
 * // [1, 2, 3, 4]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_flatten($items) {
    $result = [];
    foreach ($items as $item) {
        if (!\is_array($item)) {
            $result[] = $item;
        } else {
            $result = \array_merge($result, \array_values($item));
        }
    }
    return $result;
}
