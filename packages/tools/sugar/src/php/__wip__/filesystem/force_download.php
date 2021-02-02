<?php

namespace thorin;

/**
 * Force download the passed file with the passed name
 * @param    {String}    $filepath    The path to the file that will be downloaded
 * @param    {String}    $filename    The name of the file once it has been downloaded
 *
 * @example    php
 * Thorin::force_download('/path/to/my-file.zip', 'cool-file.zip');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://www.jonasjohn.de/snippets/php/file-download.htm
 */
function force_download($filepath, $filename) {
	// local file that should be send to the client
	$local_file = $filepath;
	// filename that the user gets as default
	$download_file = $filename;

	if(file_exists($local_file) && is_file($local_file)) {
		// send headers
		header('Cache-control: private');
		header('Content-Type: application/octet-stream');
		header('Content-Length: '.filesize($local_file));
		header('Content-Disposition: filename='.$download_file);

		// flush content
		flush();

		/*
		** You can also remove the following part and
		** replace it trough a database command fetching
		** the download data
		*/
		// open file stream
		$file = fopen($local_file, "rb");

		// send the file to the browser
		print fread ($file, filesize($local_file));

		// close file stream
		fclose($file);
	} else {
		die('Error: The file '.$local_file.' does not exist!');
	}
}
