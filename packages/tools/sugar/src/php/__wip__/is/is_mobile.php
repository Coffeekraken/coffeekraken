<?php

namespace thorin;

/**
 * Return true if the request is made from a mobile device
 * @return    {Boolean}    true if is mobile, false if not
 *
 * @example    php
 * if (Thorin::is_mobile()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/serbanghita/Mobile-Detect
 */
function is_mobile() {
	$detect = \Thorin::mobile_detect();
	return $detect->isMobile();
}
