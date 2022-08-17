<?php

namespace thorin;

/**
 * Calculate a directory size
 * @param    {String}    $directory_path    The directory path to calculate the size from
 * @return    {Integer}    The directory size
 *
 * @example    php
 * $size = Thorin::dir_size('my_cool_directory');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function dir_size($directory_path) {

    // I reccomend using a normalize_path function here
    // to make sure $directory_path contains an ending slash
    // (-> http://www.jonasjohn.de/snippets/php/normalize-path.htm)

    // To display a good looking size you can use a readable_filesize
    // function.
    // (-> http://www.jonasjohn.de/snippets/php/readable-filesize.htm)

    $size = 0;

    $dir = opendir($directory_path);

	if (!$dir)
        return -1;

    while (($file = readdir($dir)) !== false) {

        // Skip file pointers
        if ($file[0] == '.') continue;
        // Go recursive down, or add the file size
        if (is_dir($directory_path . $file))
            $size += \Thorin::dir_size($directory_path . $file . DIRECTORY_SEPARATOR);
        else
            $size += filesize($directory_path . $file);
    }
    closedir($dir);
    return $size;
}
