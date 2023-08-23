<?php

namespace Sugar\ar;

/**
 * @name            deepMerge
 * @namespace            php.ar
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function take two arrays and merge them deeply by keeping distinct
 * property keys.
 *
 * @snippet         \Sugar\ar\deepMerge($1, $2);
 *
 * @param           {Array}         ...$arrays          The arrays to merge
 * @return      {Array}                         The resulting array
 *
 * @example         php
 * \Sugar\ar\merge_deep([
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ], [
 *    'prop1' => 'Plop'
 * ]);
 * // [
 * //   'prop1' => 'Plop',
 * //   'prop2' => 'World'
 * // ]
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function _deepMerge(array $array1, array $array2)
{
    $merged = $array1;
    foreach ($array2 as $key => &$value) {
        if (
            is_array($value) &&
            isset($merged[$key]) &&
            is_array($merged[$key])
        ) {
            $merged[$key] = deepMerge($merged[$key], $value);
        } else {
            $merged[$key] = $value;
        }
    }
    return $merged;
}

function deepMerge()
{
    $args = func_get_args();
    $finalData = [];
    for ($i = 0; $i < count($args); $i++) {
        if (!is_array($args[$i])) {
            throw new \Exception(
                'The "deepMerge" function only accept array as parameters'
            );
        }
        $finalData = _deepMerge($finalData, $args[$i]);
    }
    return $finalData;
}
