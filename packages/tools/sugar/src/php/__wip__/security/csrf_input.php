<?php

namespace thorin;

use \Volnix\CSRF\CSRF;

/**
 * Generate a CSRF input hidden field
 * @param    {String}    [$name=CSRF::TOKEN_NAME]    The token name
 * @return    {String}    The input generated
 *
 * @example    php
 * $myInput = Thorin::csrf_input();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://packagist.org/packages/volnix/csrf
 */
function csrf_input($name = CSRF::TOKEN_NAME) {
	return CSRF::getHiddenInputString($name);
}
