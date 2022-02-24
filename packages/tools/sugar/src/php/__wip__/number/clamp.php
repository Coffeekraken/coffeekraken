<?php

namespace thorin;

/**
 * Clamps `number` within the inclusive `lower` and `upper` bounds.
 *
 * @param    {Number}    $number    The number to clamp
 * @param    {Number}    $lower    The lower bound
 * @param    {Number}    $upper    The upper bound
 * @return    {Number}    The clamped number
 *
 * @example    php
 * Thorin::clamp(-10, -5, 5);
 * // -5
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Number/clamp.php
 */
function clamp(int $number, int $lower, int $upper):int {
	return \_::clamp($number, $lower, $upper);
}
