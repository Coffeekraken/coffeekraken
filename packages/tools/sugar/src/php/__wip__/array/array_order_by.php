<?php

namespace thorin;

/**
 * Sorts a collection of arrays or objects by key.
 * @param    {Array}    $items    The array to process
 * @param    {String}    $attr     The attribute used to order the items
 * @param    {String}    [$order="asc"]    The order. Can be `desc` or `asc`
 *
 * @example    php
 * Thorin::array_order_by([
 *    ['id' => 2, 'name' => 'Joy'],
 *    ['id' => 3, 'name' => 'Khaja'],
 *    ['id' => 1, 'name' => 'Raja']
 * ], 'id', 'desc');
 * // [['id' => 3, 'name' => 'Khaja'], ['id' => 2, 'name' => 'Joy'], ['id' => 1, 'name' => 'Raja']]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_order_by($items, $attr, $order = 'asc') {
    $sortedItems = [];
    foreach ($items as $item) {
        $key = is_object($item) ? $item->{$attr} : $item[$attr];
        $sortedItems[$key] = $item;
    }
    if ($order === 'desc') {
        krsort($sortedItems);
    } else {
        ksort($sortedItems);
    }
    return \array_values($sortedItems);
}
