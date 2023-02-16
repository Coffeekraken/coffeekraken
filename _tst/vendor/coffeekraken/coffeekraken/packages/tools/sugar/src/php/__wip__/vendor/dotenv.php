<?php

namespace thorin;

/**
 * Return the dotenv instance used to parse the .env file at the root of the project
 * @return    {DotEnv}    The dotenv instance
 *
 * @example    php
 * Thorin::dotenv()->required('MYVAR');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/vlucas/phpdotenv
 */
function dotenv() {
	global $t_dotenv;
	return $t_dotenv;
}
