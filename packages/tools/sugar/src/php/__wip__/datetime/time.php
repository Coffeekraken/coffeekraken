<?php

namespace Thorin;

use Carbon\Carbon;
/**
 * Create a time in [Carbon](https://carbon.nesbot.com/) object format.
 *
 * @param    {Integer}    [$hour=null]    The hour of the datetime to create
 * @param    {Integer}    [$minute=null]    The minute of the datetime to create
 * @param    {Integer}    [$second=null]    The second of the datetime to create
 * @return    {Carbon}    A Carbon instance representing your time
 *
 * @example    php
 * Thorin::time(23, 30, 0)
 * // 2018-11-21 23:30:00
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://carbon.nesbot.com/    Carbon documentation
 */
function time(int $hour=null, int $minute=null, int $second=null):Carbon {
	$hour = $hour ?: intval(date('G'));
	$minute = $minute ?: intval(date('i'));
	$second = $second ?: intval(date('s'));
	// create and return a carbon instance
	return Carbon::createFromTime($hour, $minute, $second);
}
