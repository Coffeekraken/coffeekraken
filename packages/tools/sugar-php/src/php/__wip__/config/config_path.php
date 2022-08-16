<?php

namespace thorin;

/**
 * Return the config path
 * @return    {String}    The config path
 *
 * @example    php
 * $configPath = Thorin::config_path();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function config_path() {
	if (defined('T_CONFIG_PATH')) {
		$path = T_CONFIG_PATH;
	} else {
		$path = getenv('T_CONFIG_PATH');
	}
	if (!$path) {
		$path = 'app/config/';
	}
	return rtrim($path, '/') . '/';
}
