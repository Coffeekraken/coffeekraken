<?php

namespace thorin;

/**
 * Replaces matches for `pattern` in `string` with `replacement`.
 *
 * **Note:** This method is based on
 * [`String#replace`](https://mdn.io/String/replace).
 *
 * @param    {String}          $string      The string to modify
 * @param    {String}          $pattern     The pattern to replace
 * @param    {Callable|String}    $replacement    The match replacement
 * @return    {String}    The modified string.
 *
 * @example    php
 * Thorin::str_replace('Hi Fred', 'Fred', 'Barney')
 * // => 'Hi Barney'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/replace.php
 */
function str_replace(string $string, string $pattern, $replacement = null):string {
	return \_::replace($string, $pattern, $replacement);
}
