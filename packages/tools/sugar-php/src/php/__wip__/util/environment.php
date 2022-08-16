<?php

namespace thorin;

/**
 * Return the application environment set in `app.environment` config
 * @return    {String}    The environment
 *
 * @example    php
 * $env = Thorin::environment();
 * // development
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function environment() {
	// return the environment from the config
	return \Thorin::config('app.environment');
}
