<?php

namespace thorin;

/**
 * Return true if the request is made from a tablet device
 * @return    {Boolean}    true if is tablet, false if not
 *
 * @example    php
 * if (Thorin::is_tablet()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/serbanghita/Mobile-Detect
 */
function is_tablet() {
	$detect = \Thorin::mobile_detect();
	return $detect->isTablet();
}
