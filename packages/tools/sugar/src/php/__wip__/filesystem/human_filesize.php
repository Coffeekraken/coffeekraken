<?php

namespace thorin;

/**
 * Convert a filesize into a human readable filesize like 10 TO, etc...
 * @param    {Integer}    $filesize    The filesize to convert
 * @return    {String}    The converted filesize
 *
 * @example    php
 * print Thorin::human_filesize(14356543);
 * // 13.69 MB
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function human_filesize($filesize) {
	// Adapted from: http://www.php.net/manual/en/function.filesize.php

    $mod = 1024;

    $units = explode(' ','B KB MB GB TB PB');
    for ($i = 0; $filesize > $mod; $i++) {
        $filesize /= $mod;
    }

    return round($filesize, 2) . ' ' . $units[$i];
}
