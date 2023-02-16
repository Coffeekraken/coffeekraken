<?php

namespace thorin;

/**
 * Sanitize a path for example like "/my/cool/../path/." to "/my/path/"
 * It will do these actions:
 * 1. Normalize the path (resolve all ../, remove double slashed, etc...)
 * 2. Remove a trailing "."
 * 3. Make sure the path finish with a "/" if it's not a file
 *
 * @param       {String}        $path       The path to sanitize
 * @return      {String}                    The sanitize path
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function sanitize_path($path) {
	// normalize the path
	$path = \Thorin::normalize_path($path);
	// explode the path
	$splits = explode('/', $path);
	if (count($splits) == 0) return $path;
	// remove last dot like /.
	if ($splits[count($splits)-1] == '.') {
		array_pop($splits);
	}
	// reform path
	$path = implode('/', $splits);
	// check if need to tailslash the path or not
	if (strpos(basename($path), '.') === false) {
		$path = \Thorin::str_tailslash($path);
	}
	// return the new
	return $path;
}
