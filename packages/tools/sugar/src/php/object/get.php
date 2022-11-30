<?php

namespace Sugar\object;

/**
 * @name            get
 * @namespace       php.object
 * @type            Function
 *
 * This function allows you to get a value from the passed object using the passed dotpath.
 * Y
 *
 * @param       {Object}        $object         The object from which to get the value
 * @param       {String}        $dotpath        The dotpath to get in the object
 * @param       {String}        [$separator='.']        The dotpath separator
 * @return      {Any}                           The getted value
 *
 * @example         php
 * $obj = (object) [
 *   "hello" => (object) [
 *      "world" => "plop"
 *   ]
 * ];
 * \Sugar\object\get($obj, 'hello.world'); // "plop"
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function get($object, $dotpath, $separator = '.')
{
    if (is_object($object)) {
        $array = (array) $object;
    } elseif (is_array($object)) {
        $array = $object;
    } else {
        throw new Error(
            'The "get" function accepts only object and array as source...'
        );
    }

    // starts with "^"
    if (str_starts_with($dotpath, '^')) {
        $returnArray = [];
        foreach (array_keys($array) as $key) {
            if (str_starts_with($key, ltrim($dotpath, '^'))) {
                $returnArray[$key] = $array[$key];
            }
        }
        return $returnArray;
    }

    // ends with "$"
    if (str_ends_with($dotpath, '$')) {
        $returnArray = [];
        foreach (array_keys($array) as $key) {
            if (str_ends_with($key, rtrim($dotpath, '$'))) {
                $returnArray[$key] = $array[$key];
            }
        }
        return $returnArray;
    }

    $keys = explode($separator, $dotpath);
    $value = (array) $array;
    $i = 0;
    foreach ($keys as $key) {
        $value = $value[$key];
        if ($i < count($keys) - 1 && is_object($value)) {
            $value = (array) $value;
        }
        $i++;
    }
    return $value;
}
