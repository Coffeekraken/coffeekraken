<?php

namespace thorin;

/**
 * Returns a new array with n elements removed from the right
 * @param    {Array}    $items    The array to process
 * @param    {Integer}    [$n=1]    How many items to drop
 * @return    {Array}    The new array produced
 *
 * @example    php
 * Thorin::array_drop_right([1,2,3], 2) // [1]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function array_drop_right($items, $n = 1) {
	$n = ($n >= count($items)) ? count($items) : $n;
    return \array_slice($items, 0, count($items)-$n);
}
