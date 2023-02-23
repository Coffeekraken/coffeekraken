<?php

namespace Sugar\ar;

/**
 * @name            deepDiff
 * @namespace            php.ar
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function take two arrays and return only what is different from one to the other
 *
 * @param       {Array}         $array1         The base array on which to deepDiff the second
 * @param       {Array}         $array2         The array you want to deepDiff the first one
 * @return      {Array}                         The array with all the differences
 *
 * @snippet         \Sugar\ar\deepDiff($1, $2);
 *
 * @example         php
 * \Sugar\ar\deepDiff([
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ], [
 *    'prop1' => 'Plop'
 *    'prop2' => 'World'
 * ]);
 * // [
 * //   'prop1' => 'Plop'
 * // ]
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function deepDiff($array1, $array2)
{
    $array1 = (array) $array1;
    $array2 = (array) $array2;

    $diff = [];
    foreach ($array2 as $key => $value) {
        // value that does ot exists in first array
        if (!isset($array1[$key])) {
            $diff[$key] = $array2[$key];
            continue;
        }

        // value that exists and that is an array
        if (
            isset($array1[$key]) &&
            is_array($array1[$key] && is_array($value))
        ) {
            $diff[$key] = deepDiff($array1[$key], $value);
            continue;
        }
    }

    // clean output like empty array, etc...
    foreach ($diff as $key => $value) {
        if (is_array($value) && !count($value)) {
            unset($diff[$key]);
        }
    }

    return $diff;
}
