<?php

namespace thorin;

/**
 * Return true if the given number is even, false otherwise.
 * @param    {Number}   $number    The number to check
 * @return    {Boolean}    true if even, false if not
 *
 * @example    php
 * Thorin::is_even(2);
 * // true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function is_even($number) {
    return ($number % 2) === 0;
}
