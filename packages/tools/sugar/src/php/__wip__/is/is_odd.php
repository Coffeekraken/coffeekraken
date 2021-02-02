<?php

namespace thorin;

/**
 * Returns true if the given number is odd, false otherwise.
 * @param    {Number}   $number    The number to check
 * @return    {Boolean}    true if odd, false if not
 *
 * @example    php
 * Thorin::is_odd(3);
 * // true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function is_odd($number) {
    return ($number % 2) === 1;
}
