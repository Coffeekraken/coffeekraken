<?php

namespace thorin;

/**
 * Checks if `value` is an `\Exception`, `\ParseError`, \Error`, \Throwable`, \SoapFault`, \DOMException`, \PDOException`, object.
 *
 * @param    {Mixed}    $value    The value to check
 * @return    {Boolean}    `true` if `value` is an error object, else `false`
 *
 * @example    php
 * Thorin::is_error(new \Exception());
 * // true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Lang/isError.php
 */
function is_error($value):bool {
	return \_::isError($value);
}
