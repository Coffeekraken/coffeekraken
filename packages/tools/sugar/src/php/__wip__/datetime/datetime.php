<?php

namespace Thorin;

use Carbon\Carbon;
/**
 * Create a datetime in [Carbon](https://carbon.nesbot.com/) object format.
 *
 * @param    {Integer}    [$year=null]    The year of the datetime to create
 * @param    {Integer}    [$month=null]    The month of the datetime to create
 * @param    {Integer}    [$day=null]    The day of the datetime to create
 * @param    {Integer}    [$hour=null]    The hour of the datetime to create
 * @param    {Integer}    [$minute=null]    The minute of the datetime to create
 * @param    {Integer}    [$second=null]    The second of the datetime to create
 * @return    {Carbon}    A Carbon instance representing your datetime
 *
 * @example    php
 * Thorin::datetime(2018, 11, 21, 0, 0, 0)
 * // 2018-11-21 00:00:00
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://carbon.nesbot.com/    Carbon documentation
 */
function datetime(int $year=null, int $month=null, int $day=null, int $hour=null, int $minute=null, int $second=null):Carbon {
	$year = $year ?: intval(date('Y'));
	$month = $month ?: intval(date('n'));
	$day = $day ?: intval(date('j'));
	$hour = $hour ?: intval(date('G'));
	$minute = $minute ?: intval(date('i'));
	$second = $second ?: intval(date('s'));
	// create and return a carbon instance
	return Carbon::create($year, $month, $day, $hour, $minute, $second);
}
