<?php

namespace thorin;

/**
 * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
 * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
 *
 * @param    {String}    $string    The string to escape
 * @return    {String}    The escaped string
 *
 * @example    php
 * Thorin::str_escape_regexp('[lodash](https://lodash.com/)');
 * // \[lodash\]\(https://lodash\.com/\)
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see   https://github.com/lodash-php/lodash-php/blob/master/src/String/escapeRegExp.php
 */
function str_escape_regexp(string $string):string {
	return \_::escapeRegExp($string);
}
