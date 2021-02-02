<?php

namespace thorin;

/**
 * Check some ip's and redirect the passed ones to the passed url
 * @param    {Array}    $ipsList    The ip addresses to redirect. Can be something like 234.54.*.*
 * @param    {String}    $url    The url where to redirect the banned ip's
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function redirect_ip($ipsList, $url) {
	// check if the ips are marching the ips list
	if (\Thorin::is_ip_match($ipsList)) {
		// redirect the user
		\Thorin::safe_redirect($url);
	}
}
