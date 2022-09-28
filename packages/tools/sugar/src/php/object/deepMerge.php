<?php

namespace Sugar\object;

/**
 * @name            deepMerge
 * @namespace            php.object
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to merge deeply two objects
 *
 * @param       {Object}        $object1        The first object
 * @param       {Object}        $object2        The second object
 * @return      {Object}                        The merged object
 *
 * @example         php
 * \Sugar\object\deepMerge((object) [
 *  'hello' => 'world'
 * ], (object) [
 *  'plop' => true
 * ]);
 *
 * @see         https://developer.wordpress.org/reference/functions/deepMerge/
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function deepMerge($obj1, $obj2)
{
    if (is_object($obj2)) {
        $keys = array_keys(get_object_vars($obj2));
        foreach ($keys as $key) {
            if (
                isset($obj1->{$key}) &&
                is_object($obj1->{$key}) &&
                is_object($obj2->{$key})
            ) {
                $obj1->{$key} = deepMerge($obj1->{$key}, $obj2->{$key});
            } elseif (
                isset($obj1->{$key}) &&
                is_array($obj1->{$key}) &&
                is_array($obj2->{$key})
            ) {
                $obj1->{$key} = deepMerge($obj1->{$key}, $obj2->{$key});
            } else {
                $obj1->{$key} = $obj2->{$key};
            }
        }
    } elseif (is_array($obj2)) {
        if (is_array($obj1) && is_array($obj2)) {
            $obj1 = array_merge_recursive($obj1, $obj2);
        } else {
            $obj1 = $obj2;
        }
    }

    return $obj1;
}
