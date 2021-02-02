<?php

namespace Thorin;

use Carbon\Carbon;
/**
 * Create a date in [Carbon](https://carbon.nesbot.com/) object format.
 *
 * @param    {Integer}    [$year=null]    The year of the datetime to create
 * @param    {Integer}    [$month=null]    The month of the datetime to create
 * @param    {Integer}    [$day=null]    The day of the datetime to create
 * @return    {Carbon}    A Carbon instance representing your date
 *
 * @example    php
 * Thorin::date(2018, 11, 21)
 * // 2018-11-21 00:00:00
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://carbon.nesbot.com/    Carbon documentation
 */
function date(int $year=null, int $month=null, int $day=null):Carbon {
	$year = $year ?: intval(date('Y'));
	$month = $month ?: intval(date('n'));
	$day = $day ?: intval(date('j'));
	// create and return a carbon instance
	return Carbon::createFromDate($year, $month, $day);
}
