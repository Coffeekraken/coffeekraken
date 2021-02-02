<?php

namespace thorin;

/**
 * Return true if the request is made from an ios device
 * @return    {Boolean}    true if is ios, false if not
 *
 * @example    php
 * if (Thorin::is_ios()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/serbanghita/Mobile-Detect
 */
function is_ios() {
	$detect = \Thorin::mobile_detect();
	return $detect->isiOS();
}
