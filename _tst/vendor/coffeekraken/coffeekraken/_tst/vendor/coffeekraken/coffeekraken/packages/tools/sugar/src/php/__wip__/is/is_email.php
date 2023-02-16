<?php

namespace thorin;

/**
 * Check if the passed email is valid
 * @param    {String}    $value    The value to check if is an email or not
 * @return    {Boolean}    true if is an email, false if not
 *
 * @example    php
 * if (Thorin::is_email('something@something.com')) {
 *     // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function is_email($value) {
	return \filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
}
