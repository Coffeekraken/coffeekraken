<?php

namespace thorin;

use Carbon\Carbon;
/**
 * Return the current datetime in [Carbon](https://carbon.nesbot.com/) object format.
 *
 * @example    php
 * Thorin::now();
 * // 2018-11-21 22:00:00
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://carbon.nesbot.com/    Carbon documentation
 */
function now():Carbon {
	return Carbon::now();
}
