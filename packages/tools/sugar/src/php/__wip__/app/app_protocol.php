<?php

namespace thorin;

/**
 * Return the application protocol used to request the page
 * @return    {String}    The protocol used
 *
 * @example    php
 * $protocol = Thorin::app_protocol();
 * // https
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function app_protocol() {
	// return the protocol from the config
	return \Thorin::config('app.protocol');
}
