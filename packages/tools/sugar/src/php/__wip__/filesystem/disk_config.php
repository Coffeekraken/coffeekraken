<?php

namespace thorin;

/**
 * Return a disk configuration array
 * @param    {String}    [$name="base"]    The name of the disk wanted
 * @return    {Array}    The disk configuration
 *
 * @example    php
 * $config = Thorin::disk_config('base');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function disk_config($name = 'base') {
	$name = strtolower($name);
	return \Thorin::config('filesystem.disks.' . $name);
}
