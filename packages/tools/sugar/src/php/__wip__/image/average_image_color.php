<?php

namespace thorin;

use ColorThief\ColorThief;
/**
 * Get the average color of an image in hexadecimal format like "45A3F3"
 * @param    {String}    $filePath    The file path to the image
 * @return    {String}    The average color of the image
 *
 * @example    php
 * $color = Thorin::average_image_color(Thorin::asset_path('img/my-cool-image.jpg'));
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/ksubileau/color-thief-php
 */
function average_image_color($filePath) {
	if ( ! file_exists($filePath)) {
		throw new \Exception('The image "' . $filePath . '" does not exist');
	}
	// grab the dominant color from the image
	$dominantColor = ColorThief::getColor($filePath);
	// return the dominant color
	return _t_toHex($dominantColor[0]) . _t_toHex($dominantColor[1]) . _t_toHex($dominantColor[2]);
}

function _t_toHex($n) {
    $n = intval($n);
    if (!$n)
        return '00';
    $n = max(0, min($n, 255)); // make sure the $n is not bigger than 255 and not less than 0
    $index1 = (int) ($n - ($n % 16)) / 16;
    $index2 = (int) $n % 16;
    return substr("0123456789ABCDEF", $index1, 1)
        . substr("0123456789ABCDEF", $index2, 1);
}
