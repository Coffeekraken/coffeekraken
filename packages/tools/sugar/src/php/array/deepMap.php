<?php

namespace Sugar\ar;

/**
 * @name            deepMap
 * @namespace            php.ar
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to map deeply on an array (object)
 *
 * @param       {Array}         $array         The array to deep map on
 * @param       {Function}      $callback       The function to run on each values. Must return the new value to set
 * @return      {Array}                         The processed array
 *
 * @example         php
 * \Sugar\ar\deepMap([
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ], function($value) {
 *      return 'Hello ' . $value;
 * });
 * // [
 * //   'prop1' => 'Hello Plop',
 * //   'prop2' => 'Hello World'
 * // ]
 *
 * @see             https://developer.wordpress.org/reference/functions/deepMap/
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function deepMap($value, $callback, $_initialValue = null)
{
    if (is_array($value)) {
        foreach ($value as $index => $item) {
            $value[$index] = deepMap($item, $callback, $_initialValue);
        }
    } elseif (is_object($value)) {
        $object_vars = get_object_vars($value);
        foreach ($object_vars as $propertyName => $propertyValue) {
            $value->$propertyName = deepMap(
                $propertyValue,
                $callback,
                $_initialValue
            );
        }
    } else {
        $value = call_user_func($callback, $value, $_initialValue);
    }

    return $value;
}
