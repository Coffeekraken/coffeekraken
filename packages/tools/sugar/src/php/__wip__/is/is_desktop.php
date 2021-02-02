<?php

namespace thorin;

/**
 * Return true if the request is made from a desktop device
 * @return    {Boolean}    true if is desktop, false if not
 *
 * @example    php
 * if (Thorin::is_desktop()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/serbanghita/Mobile-Detect
 */
function is_desktop() {
	$detect = \Thorin::mobile_detect();
	return ! $detect->isMobile() && ! $detect->isTablet();
}
