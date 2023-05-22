<?php

namespace Sugar\ar;

/**
 * @name            deepFilter
 * @namespace            php.array
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to filter deeply an object or an array.
 * It will call the $callback closure on higher elements first then will go deeper on left items
 *
 * @param       {Array}         $value         The array/object to deep filter on
 * @param       {Function}      $callback       The function to run on each values. If return true, the item is kept, if false, it is removed
 * @return      {Array}                         The processed array/object
 *
 * @snippet             \Sugar\ar\deepFilter($1, $2);
 * \Sugar\ar\deepFilter($1, function(\$prop, \$value) {
 *      $0
 * });
 *
 * @example         php
 * \Sugar\ar\deepFilter((object) [
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ], function($prop, $value) {
 *      return false;
 * });
 * // []
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function deepFilter($value, $callback)
{
    $newObject = is_array($value) ? [] : (object) [];

    foreach ($value as $prop => $item) {
        $res = $callback($prop, $item);
        if ($res != false) {
            if (is_array($newObject)) {
                array_push($newObject, $item);
            } elseif (is_object($newObject)) {
                $newObject->$prop = $item;
            }
        }
    }

    return $newObject;
}
