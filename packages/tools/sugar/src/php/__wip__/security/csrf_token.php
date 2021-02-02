<?php

namespace thorin;

use \Volnix\CSRF\CSRF;

/**
 * Return the token for the given name, or the default token if no name is provided
 * @param    {String}    [$name=CSRF::TOKEN_NAME]    The name of the token to retreive
 * @return    {String}    The token retrieved
 *
 * @example    php
 * $token = Thorin::csrf_token();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://packagist.org/packages/volnix/csrf
 */
function csrf_token($name = CSRF::TOKEN_NAME) {
	return CSRF::getToken($name);
}
