<?php

namespace thorin;

use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Adapter\Ftp as FtpAdapter;
use League\Flysystem\Sftp\SftpAdapter;
use Aws\S3\S3Client;
use League\Flysystem\AwsS3v3\AwsS3Adapter;
use League\Flysystem\Memory\MemoryAdapter;
$t_filesystems = [];
/**
 * Create a filesystem instance with the disk requested. Return a [Flysystem](https://flysystem.thephpleague.com/docs/usage/filesystem-api/) instance to work with.
 * If no disk is passed, the default one in the config filsystem.default_disk will be used.
 * @param    {String}    [$disk=null]    The disk wanted. can be any disk configured in your filesystem config file.
 *
 * @example    php
 * $ftp = Thorin::fs_disk_factory('ftp');
 * $contents = $ftp->listContents('/')
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function disk_factory($disk = null) {
	global $t_filesystems;

	// handle no disk passed
	if ( ! $disk) {
		return \Thorin::disk_factory(\Thorin::config('filesystem.default_disk'));
	}

	// make sure the disk passed in in lowercase
	if ($disk) $disk = strtolower($disk);
	// check if a filesystem already exist with this disk
	if (isset($t_filesystems[$disk])) {
		// return the cached pool
		return $t_filesystems[$disk];
	}

	// get the disk configuration
	$config = \Thorin::disk_config($disk);

	// handle no config
	if ( ! $config) {
		throw new Exception('The disk "'.$disk.'" does not exist');
	}

	// switch on the driver
	switch($config['driver']) {
		case 'local':
			$adapter = new Local(\Thorin::sanitize_path($config['path']));
			$filesystem = new Filesystem($adapter);
		break;
		case 'ftp':
			$filesystem = new Filesystem(new FtpAdapter([
				'host' => $config['host'],
				'username' => $config['username'],
				'password' => $config['password'],
				/** optional config settings */
				'port' => $config['port'],
				'root' => \Thorin::sanitize_path($config['root']),
				'passive' => $config['passive'],
				'ssl' => $config['ssl'],
				'timeout' => $config['timeout'],
			]));
		break;
		case 'sftp':
			$filesystem = new Filesystem(new SftpAdapter([
				'host' => $config['host'],
				'port' => $config['port'],
				'username' => $config['username'],
				'password' => $config['password'],
				'privateKey' => $config['privatekey'],
				'root' => \Thorin::sanitize_path($config['root']),
				'timeout' => $config['timeout'],
			]));
		break;
		case 's3':
			$client = S3Client::factory([
				'credentials' => [
					'key'    => $config['key'],
					'secret' => $config['secret'],
				],
				'region' => $config['region'],
				'version' => 'latest',
			]);
			$adapter = new AwsS3Adapter($client, $config['bucket'], \Thorin::sanitize_path($config['root']));
			$filesystem = new Filesystem($adapter);
		break;
		case 'memory':
			$filesystem = new Filesystem(new MemoryAdapter());
		break;
	}
	// save filesystem in stack to avoid creating multiple filesystem of the same adapter
	$t_filesystems[$disk] = $filesystem;
	// return the filesystem
	return $filesystem;
}
