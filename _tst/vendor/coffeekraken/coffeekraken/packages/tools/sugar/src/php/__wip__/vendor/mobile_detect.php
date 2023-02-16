<?php

namespace thorin;

$t_mobile_detect = null;
/**
 * Return a mobile detect instance to work with
 * @return    {Mobile_Detect}    A mobile detect instance to work with
 *
 * @example    php
 * if (Thorin::mobile_detect()->is('Firefox')) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/serbanghita/Mobile-Detect
 */
function mobile_detect() {
	global $t_mobile_detect;
	if ( ! $t_mobile_detect) {
		$t_mobile_detect = new \Mobile_Detect();
	}
	return $t_mobile_detect;
}
