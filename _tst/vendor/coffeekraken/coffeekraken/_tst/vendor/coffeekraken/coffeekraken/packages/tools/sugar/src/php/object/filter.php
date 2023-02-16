<?php

namespace Sugar\object;

/**
 * @name            filter
 * @namespace       php.object
 * @type            Function
 *
 * This function allows you filter some object items either by:
 * - `^...`: The keys that starts with the passed string
 * - `...$`: The keys that ends with the passed string
 * - `function($key, $value) { retur true; }`: A function that must return true or false
 *
 * @param       {Object}        $object         The object to filter
 * @param       {String|Function}       $filter         The filter to use
 * @return      {Object}                        The filtered object
 *
 * @example         php
 * $obj = (object) [
 *   "hello" => 'world',
 *   "yop" => 'plop',
 *   "helloPlop" => true
 * ];
 * \Sugar\object\filter($obj, '^hel'); // (object) ["hello" => 'world', "helloPlop" => true]
 * \Sugar\object\filter($obj, function($key, $value) {
 *   return false;
 * }); // (object) []
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function filter($object, $filter)
{
    if (is_object($object)) {
        $array = (array) $object;
    } elseif (is_array($object)) {
        $array = $object;
    } else {
        throw new Error(
            'The "filter" function accepts only object and array as source...'
        );
    }

    $return = [];

    if (is_callable($filter)) {
        foreach (array_keys($array) as $key) {
            if (call_user_func($filter, $key, $array[$key])) {
                $return[$key] = $array[$key];
            }
        }
    } elseif (is_string($filter)) {
        // starts with "^"
        if (str_starts_with($filter, '^')) {
            foreach (array_keys($array) as $key) {
                if (str_starts_with($key, ltrim($filter, '^'))) {
                    $return[$key] = $array[$key];
                }
            }
        }

        // ends with "$"
        if (str_ends_with($filter, '$')) {
            $return = [];
            foreach (array_keys($array) as $key) {
                if (str_ends_with($key, rtrim($filter, '$'))) {
                    $return[$key] = $array[$key];
                }
            }
            return $return;
        }
    }

    // return the object
    return (object) $return;
}
