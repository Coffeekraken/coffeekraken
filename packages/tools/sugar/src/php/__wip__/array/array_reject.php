<?php

namespace thorin;

/**
 * Filters the collection using the given callback.
 * @param    {Array}    $items    The array to process
 * @param    {Callback}    $func    The function used to filter the items
 * @return    {Array}    The filtered array
 *
 * @example    php
 * Thorin::array_reject(['Apple', 'Pear', 'Kiwi', 'Banana'], function($item) {
 *   return strlen($item) > 4;
 * });
 * // ['Pear','Kiwi']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_reject($items, $func) {
    return \array_values(\array_diff($items, \array_filter($items, $func)));
}
