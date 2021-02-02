<?php

namespace thorin;

/**
 * Check if the passed string is upper case
 * @param    {String}    $string    The string to check
 * @return    {Boolean}    true if upper case, false if not
 *
 * @example    php
 * Thorin::str_is_upper_case('Hello world');
 * // false
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function str_is_upper_case($string) {
    return $string === strtoupper($string);
}
