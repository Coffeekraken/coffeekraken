<?php

namespace thorin;

/**
 * Groups the elements of an array based on the given function.
 * @param    {Array}    $items    The array to process
 * @param    {Callable}    $func    The function used to group the items
 * @return    {Array}    The grouped array
 *
 * @example    php
 * Thorin::array_group_by(['one','two','three'], 'strlen');
 * // [3 => ['one', 'two'], 5 => ['three']]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_group_by($items, $func)
{
    $group = [];
    foreach ($items as $item) {
        if ((!is_string($func) && is_callable($func)) || function_exists($func)) {
            $key = call_user_func($func, $item);
            $group[$key][] = $item;
        } elseif (is_object($item)) {
            $group[$item->{$func}][] = $item;
        } elseif (isset($item[$func])) {
            $group[$item[$func]][] = $item;
        }
    }
    return $group;
}
