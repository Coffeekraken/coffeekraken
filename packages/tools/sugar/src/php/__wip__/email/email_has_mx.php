<?php

namespace thorin;

/**
 * Check if the passed email address has some mx configurated.
 *
 * @param    {String}    $email    The email to check mx for
 * @return    {Boolean}    `true` if has some mx, `false` if not
 *
 * @example    php
 * Thorin::email_has_mx('hello@google.com');
 * // true
 * Thorin::email_has_mx('example@example.com');
 * // false
 * Thorin::email_has_mx('example.com');
 * // null
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/nojacko/email-validator
 */
function email_has_mx($email) {
	$validator = new \EmailValidator\Validator();
	return $validator->hasMx($email);
}
