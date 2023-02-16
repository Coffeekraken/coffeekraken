<?php

namespace thorin;

/**
 * Creates a new array concatenating `array` with any additional arrays
 * and/or values.
 *
 * @param    {Array}    $array    The array to concatenate
 * @param    {Array|Mixed}    ...$values    The values to concatenate
 *
 * @example    php
 * Thorin::array_concat([1], 2, [3], [[4]])
 * // [1, 2, 3, [4]]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/concat.php
 */
function array_concat($array, ...$values): array {
    $check = function ($value): array {
        return \is_array($value) ? $value : [$value];
    };
    return \array_merge($check($array), ...\array_map($check, $values));
}
