<?php

namespace thorin;

/**
 * The inverse of `escape`this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;` in `string` to
 * their corresponding characters.
 *
 * @param    {String}    $string    	The string to unescape
 * @return    {String}    The unescaped string
 *
 * @example    php
 * Thorin::str_unescape('fred, barney, &amp; pebbles');
 * // 'fred, barney, & pebbles'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/unescape.php
 */
function str_unescape(string $string):string {
	return \_::unescape($string);
}
