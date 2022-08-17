<?php

namespace thorin;

/**
 * Check if array is assocative or not
 * @param       {Array}        $arr       	The array to check
 * @return 		{Boolean} 					true if is an assoc array, false if not
 *
 * @example    php
 * Thorin::array_is_assoc(['a' => 1, 'b' => 2]);
 * // true
 *
 * @author 		Paul Balanche <pb@buzzbrothers.ch>
 */
function array_is_assoc($arr) {
	if (array() === $arr) return false;
	return @\array_keys($arr) !== range(0, count($arr) - 1);
}
