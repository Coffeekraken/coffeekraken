<?php

namespace thorin;

/**
 * The inverse of `Thorin::array_to_pairs`, this method returns an object composed
 * from key-value `pairs`.
 *
 * @param    {Array}    $pairs    The key-value pairs
 * @return    {Object}    The new object
 *
 * @example    php
 * Thorin::array_from_pairs([['a', 1], ['b', 2]]);
 * // {'a':1, 'b': 2}
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/fromPairs.php
 */
function array_from_pairs(array $pairs): \stdClass {
	return \_::fromPairs($pairs);
}
