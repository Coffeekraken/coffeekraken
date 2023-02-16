<?php

namespace thorin;

/**
 * Remove all whitespaces in the passed string
 * @param    {String}    $string    The string to process
 * @return    {String}    The processed string
 *
 * @example    php
 * $whitespaceFree = Thorin::str_remove_whitespaces('hello world');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function str_remove_whitespaces($string) {
	return preg_replace('/\s+/', '', $string);
}
