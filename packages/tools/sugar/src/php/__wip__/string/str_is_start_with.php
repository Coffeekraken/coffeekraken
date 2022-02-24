<?php

namespace thorin;

/**
 * Check if the passed string start with the other passed string
 * @param    {String}    $source    The source string to check
 * @param    {String}    $with    The "with" string to check
 * @return    {Boolean}    true if start with, false if not
 *
 * @example    php
 * if (Thorin::str_is_start_with($myText, 'hello world')) {
 *   // do something here
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function str_is_start_with($source, $with) {
	return strpos($source, $with) === 0;
}
