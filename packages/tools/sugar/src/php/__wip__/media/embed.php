<?php

namespace thorin;

use Embed\Embed;

/**
 * Get the embed code for the passed url
 *
 * @param   {String}        $url        The url of the video to embed
 * @return  {String}                    The embed code
 *
 * @example    php
 * Thorin::embed('https://www.youtube.com/watch?v=1qSTcxt2t74');
 * // <iframe src="...
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function embed($url) {
    $info = Embed::create($url);
    $code = $info->code;
    return $code;
}
