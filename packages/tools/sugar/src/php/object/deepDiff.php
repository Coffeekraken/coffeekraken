<?php

namespace Sugar\object;

/**
 * @name            deepDiff
 * @namespace            php.object
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function take two objects and return only what is different from one to the other
 *
 * @param       {Object}         $object1         The base object on which to deepDiff the second
 * @param       {Object}         $object2         The object you want to deepDiff the first one
 * @return      {Object}                         The object with all the differences
 *
 * @snippet             \Sugar\object\deepDiff($1, $2);
 *
 * @example         php
 * \Sugar\object\deepDiff((object) [
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ], (object) [
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
function deepDiff($object1, $object2)
{
    // print '<pre>';
    // print_r($object1);
    // print 'COCO';
    // print_r($object2);

    $object1 = (object) $object1;
    $object2 = (object) $object2;

    $diff = (object) [];
    $keys = array_keys(get_object_vars($object2));
    foreach ($keys as $key) {
        $value = $object2->$key;

        // value that does ot exists in first array
        if (!isset($object1->$key)) {
            $diff->$key = $object2->$key;
            continue;
        }

        // value that exists and that is an array
        if (
            isset($object1->$key) &&
            is_array($object1->$key && is_array($value))
        ) {
            $diff->$key = deepDiff($object1->$key, $value);
            continue;
        }
    }

    // clean output like empty array, etc...
    $diffKeys = array_keys(get_object_vars($diff));
    foreach ($diffKeys as $key) {
        $value = $object2->$key;
        if (is_array($value) && !count($value)) {
            unset($diffKeys->$key);
        }
    }

    return $diff;
}
