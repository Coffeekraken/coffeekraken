<?php

namespace thorin;

/**
 * Return a md5 hash of the passed directory
 * @param    {String}    $directory_path    The directory path to hash
 * @return    {String}    The md5 hash of the directory
 *
 * @example    php
 * $ext = Thorin::hash_directory('my/cool/directory');
 * // A92B0AB54ACC099B298B9DA94AFB4461
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function hash_directory($directory_path) {
	if (! is_dir($directory_path))
    {
        return false;
    }

    $files = array();
    $dir = dir($directory_path);

    while (false !== ($file = $dir->read()))
    {
        if ($file != '.' and $file != '..')
        {
            if (is_dir($directory_path . '/' . $file))
            {
                $files[] = \Thorin::hash_directory($directory_path . '/' . $file);
            }
            else
            {
                $files[] = md5_file($directory_path . '/' . $file);
            }
        }
    }

    $dir->close();

    return md5(implode('', $files));
}
