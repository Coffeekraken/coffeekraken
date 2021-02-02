<?php

namespace thorin;

/**
 * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
 * corresponding HTML entities.
 *
 * @param    {String}    $string    The string to escape
 * @return    {String}    The escaped string
 *
 * @example    php
 * Thorin::str_escape('fred, barney, & pebbles');
 * // fred, barney, &amp pebbles
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/escape.php
 */
function str_escape(string $string) {
	return \_::escape($string);
}
