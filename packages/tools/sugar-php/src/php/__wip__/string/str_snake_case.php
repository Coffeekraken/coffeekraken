<?php

namespace thorin;

/**
 * Converts `string` to
 * [snake case](https://en.wikipedia.org/wiki/Snake_case).
 *
 * @param    {String}    $string    The string to convert
 * @return    {String}    Returns the snake cased string
 *
 * @example php
 * Thorin::str_snake_case('Foo Bar')
 * // => 'foo_bar'
 *
 * Thorin::str_snake_case('fooBar')
 * // => 'foo_bar'
 *
 * Thorin::str_snake_case('--FOO-BAR--')
 * // => 'foo_bar'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/snakeCase.php
 */
function str_snake_case(string $string):string {
	return \_::snakeCase($string);
}
