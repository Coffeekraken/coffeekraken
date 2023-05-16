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
 * @snippet             \Sugar\object\deepMerge($1, $2);
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
function _deepMerge($obj1, $obj2)
{
    $obj1 = (array) $obj1;
    $obj2 = (array) $obj2;

    foreach ($obj2 as $key => $value) {
        if (!isset($obj1[$key])) {
            $obj1[$key] = $value;
            continue;
        }

        $isSourceMergeable =
            is_object($obj1[$key]) || \Sugar\is\assocArray($obj1[$key]);
        if (!$isSourceMergeable) {
            $obj1[$key] = $value;
            continue;
        }

        if (is_object($value) || \Sugar\is\assocArray($value)) {
            $obj1[$key] = _deepMerge($obj1[$key], $value);
        }
    }

    return (object) $obj1;
}
function deepMerge(...$args)
{
    $current = $args[0];
    $obj2 = $args[1];

    for ($i = 1; $i < count($args); $i++) {
        $current = _deepMerge($current, $obj2);
        $obj2 = $args[$i];
    }

    return (object) $current;
}
