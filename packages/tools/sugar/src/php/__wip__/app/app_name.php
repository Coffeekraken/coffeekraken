<?php

namespace thorin;

/**
 * Return the application name
 * @return    {String}    The name
 *
 * @example    php
 * $domain = Thorin::app_name();
 * // Thorin application
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function app_name() {
	// return the name from the config
	return \Thorin::config('app.name');
}
