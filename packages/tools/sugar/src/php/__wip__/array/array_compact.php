<?php

namespace thorin;

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @param    {Array}    $array    The array to compact
 * @return    {Array}    The new array of filtered values
 *
 * @example    php
 * Thorin::array_compact([0, 1, false, 2, '', 3]);
 * // [1, 2, 3]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/compact.php
 */
function array_compact(array $array): array {
    return \array_values(\array_filter($array ?? []));
}
