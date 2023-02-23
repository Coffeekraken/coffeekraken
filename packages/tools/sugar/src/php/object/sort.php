<?php

namespace Sugar\object;

/**
 * @name                                sort
 * @namespace            php.object
 * @type                                Function
 * @platform          php
 * @status        beta
 *
 * Sort an object properties the same way Array.sort made it in js.
 *
 * @param                 {Object}                  object                The object to sort
 * @param                 {Function}                sort                  The sort function to use
 * @return                {Object}                                        The sorted object
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet             \Sugar\object\sort($1, $2);
 * \Sugar\object\sort($1, function(\$a, \$b) {
 *      $0
 * });
 *
 * @example               js
 * import { __sort } from '@coffeekraken/sugar/object';
 * __sort({
 *    coco: { weight: 10 },
 *    lolo: { weight: 2 },
 *    plop: { weight: 5 }
 * }, (a, b) => {
 *   return a.value.weight - b.value.weight;
 * });
 * // {
 * //   lolo: { weight: 2 },
 * //   plop: { weight: 5 },
 * //   coco: { weight: 10 }
 * // }
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sort($object, $sort)
{
    // get the object keys
    $keys = array_keys((array) $object);

    // sort the keys
    usort($keys, function ($a, $b) use ($sort, $object) {
        // call the sort function passed as parameter
        return $sort(
            [
                'key' => $a,
                'value' => $object->$a,
            ],
            [
                'key' => $b,
                'value' => $object->$b,
            ]
        );
    });

    // create the new sorted object
    $resultObj = (object) [];
    // loop on each sorted keys
    foreach ($keys as $k) {
        // add the property key with the object value
        $resultObj->$k = $object->$k;
    }

    // return the result sorted object
    return $resultObj;
}
