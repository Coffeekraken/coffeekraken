<?php

namespace thorin;

/**
 * Create an array with a range from, to.
 * @param    {Integer}    [$from=0]    From where to start the array
 * @param    {Integer}    [$to=100]    To where the array ends
 * @param    {Integer}    [$step=1]    The step between each values
 *
 * @example    php
 * $ranges = Thorin::array_range(0,10);
 * // [0,1,2,3,4,5,6,7,8,9,10]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://www.jonasjohn.de/snippets/php/array-range.htm
 */
function array_range($from, $to, $step=1){
    $array = array();
    for ($x=$from; $x <= $to; $x += $step){
        $array[] = $x;
    }
    return $array;
}
