<?php

namespace thorin;

// import the Intervention Image Manager Class
use Intervention\Image\ImageManager;

/**
 * Optimize the passed image by compressing (resize and quality) it.
 * @param 		{String} 		$path 				The image path to process absolute to the server root folder
 * @param  		{String}  		[$saveTo=null] 		Where to store the optimized image absolute to the server root folder
 * @param 		{Object} 		[$settings={}] 		The settings to tell how to compress the image
 * @return 		{String} 							The optimized image path. If cache is not used, return the image in base64 format
 *
 * @example    php
 * $url = Thorin::optimize_image('my/cool/image.jpg);
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function optimize_image($path, $saveTo = null, $settings = []) {
	$originalSettings = (object) [
		'quality' => \Thorin::config('image.QUALITY'),
		'width' => \Thorin::config('image.MAX_WIDTH'),
		'height' => \Thorin::config('image.MAX_HEIGHT')
	];

	$settings = \Thorin::extend($originalSettings, $settings);

	// process the $path argument
	$serverFilePath = \Thorin::sanitize_path($path);

	// init manager
	$manager = new ImageManager(array('driver' => 'gd'));
	$image = $manager->make($serverFilePath);

	// resize image if needed
	if ($settings->width || $settings->height) {
		$image->resize($settings->width, $settings->height, function ($constraint) {
			$constraint->aspectRatio();
			$constraint->upsize();
		});
	}

	if ($saveTo) {
		// save the image in cache
		$image->save($saveTo, $settings->quality);
		return $saveTo;
	} else {
		// return the image as url encoded
		return $image->encode('data-url', $settings->quality);
	}
}
