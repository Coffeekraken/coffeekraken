<?php

namespace thorin;

/**
 * Gets the size of `collection` by returning its length for array
 * values or the number of public properties for objects.
 *
 * @param    {Array|Object|String}    $collection    The collection to inspect
 * @return    {Integer}    The collection size
 *
 * @example    php
 * Thorin::size([1, 2, 3]);
 * // 3
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Collection/size.php
 */
function size($collection):int {
	return \_::size($collection);
}
