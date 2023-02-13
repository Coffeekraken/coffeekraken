<?php

namespace Sugar\type;

/**
 * @name            typeToString
 * @namespace            php.type
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function take as input either a simple string that will be returned as he's, or a type object|array like:
 * {
 *    types: [{
 *        type: 'Array',
 *        of: ['String','Boolean']
 *    }, {
 *        type: 'Array',
 *        of: undefined
 *    }]
 * }
 * And convert it into a type string like:
 * Array<String|Boolean>|Array
 *
 * @param       {String|Array}          $type           The type to convert into string
 * @return      {String}                        The type string
 *
 * @example         php
 * Sugar\type\generateRandomString('Array'); // => Array
 * Sugar\type\generateRandomString({
 *    types: [{
 *        type: 'Array',
 *        of: ['String','Boolean']
 *    }]
 * }); // => Array<String|Boolean>
 *
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function typeToString($type)
{
    // if the passed type is already a string
    // return it as he's
    if (is_string($type)) {
        return $type;
    }

    // if the passed type if an array (or an object)
    if (is_array($type) || is_object($type)) {
        // cast to array just in case
        $type = (array) $type;

        // simple type
        if (isset($type['type'])) {
            if (isset($type['of']) && count($type['of'])) {
                return $type['type'] . '<' . implode('|', $type['of']) . '>';
            }
            return $type['type'];
        }

        // multiple types
        $types = [];
        if (isset($type['types'])) {
            foreach ($type['types'] as $t) {
                $newType = typeToString($t);
                array_push($types, $newType);
            }
            return implode('|', $types);
        }
    }

    return 'unknown';
}
