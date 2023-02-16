<?php

namespace thorin;

/**
 * Return true if the request is made from an android device
 * @return    {Boolean}    true if is android, false if not
 *
 * @example    php
 * if (Thorin::is_android()) {
 *   // do something
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/serbanghita/Mobile-Detect
 */
function is_android() {
	$detect = \Thorin::mobile_detect();
	return $detect->isAndroidOS();
}
