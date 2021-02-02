<?php

namespace thorin;

/**
 * Return a mailer configuration array
 * @param    {String}    [$name=null]    The name of the mailer wanted. If not specified will take the email.default_driver config
 * @return    {Array}    The mailer configuration
 *
 * @example    php
 * $disk = Thorin::mailer_config('gmail');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function mailer_config($name = null) {
	if ($name === null) {
		$name = \Thorin::config('email.default_mailer');
	}
	$name = strtolower($name);
	return \Thorin::config('email.mailers.' . $name);
}
