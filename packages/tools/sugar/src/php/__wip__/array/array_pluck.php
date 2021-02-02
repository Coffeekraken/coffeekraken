<?php

namespace thorin;

/**
 * Retrieves all of the values for a given key.
 * @param    {Array}    $items    The array to process
 * @param    {String}    $key    The key to extract
 * @return    {Array}    An array of extracted values
 *
 * @example    php
 * Thorin::array_pluck([
 *   ['product_id' => 'prod-100', 'name' => 'Desk'],
 *   ['product_id' => 'prod-200', 'name' => 'Chair'],
 * ], 'name');
 * // ['Desk','Chair']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_pluck($items, $key) {
    return \array_map( function($item) use ($key) {
        return is_object($item) ? $item->$key : $item[$key];
    }, $items);
}
