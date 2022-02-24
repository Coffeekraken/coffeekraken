<?php

namespace thorin;

/**
 * Return the application domain
 * @return    {String}    The domain
 *
 * @example    php
 * $domain = Thorin::app_domain();
 * // thorin.io
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function app_domain() {
	// return the protocol from the config
	return \Thorin::config('app.domain');
}
