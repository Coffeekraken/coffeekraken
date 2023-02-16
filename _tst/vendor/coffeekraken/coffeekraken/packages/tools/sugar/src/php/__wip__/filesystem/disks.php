<?php

namespace thorin;

/**
 * Mount some disks inside a manager and return a [League\Flysystem\MountManager](https://flysystem.thephpleague.com/docs/advanced/mount-manager/) instance to work with.
 * @param    {String}    $disks...    The disks that you want inside your pool
 * @return   {League\Flysystem\MountManager}    Return the MountManager instance to work with
 *
 * @example    php
 * $pool = Thorin::disks('base','assets');
 * $pool->listContents();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function disks() {
	$disks = func_get_args();
	$manager = new League\Flysystem\MountManager();
	// loop on each disks to add them inside the pool
	foreach ($disks as $disk) {
		$manager->mountFilesystem($disk, \Thorin::disk($disk));
	}
	// return the manager
	return $manager;
}
