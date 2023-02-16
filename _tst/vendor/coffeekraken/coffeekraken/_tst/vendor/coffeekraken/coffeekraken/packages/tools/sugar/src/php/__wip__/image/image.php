<?php

namespace thorin;

// import the Intervention Image Manager Class
use Intervention\Image\ImageManager;

/**
 * Return an Intervention Image instance to work with
 * @param    {String}     $path    The path to the image to work with absolute to the server root folder
 * @return    {Intervention\Image\Image}    The Intervention Image instance
 *
 * @example    php
 * $image = Thorin::image('/my/cool/project/path/my-cool-image.png');
 * $image->resize(200,300);
 * $image->save('my-cool-image.png');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function image($path) {
	// init manager
	$manager = new ImageManager(array('driver' => 'gd'));
	$image = $manager->make($path);
	// return the image instance
	return $image;
}
