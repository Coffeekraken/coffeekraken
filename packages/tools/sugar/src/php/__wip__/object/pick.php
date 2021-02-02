<?php

namespace thorin;

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @param    {Object}    $object    The source object
 * @param    {String|String[]}    $paths    The property paths to pick
 * @return    {Object}    The new object
 *
 * @example    php
 * $object = (object) ['a' => 1, 'b' => '2', 'c' => 3];
 * Thorin::pick($object, ['a','c']);
 * // (object) ['a' => 1, 'c' => 3]
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Object/pick.php
 */
function pick($object, $paths):\stdClass {
	$result = new \stdClass;
	foreach($paths as $key) {
		if (isset($object->$key)) {
			$result->$key = $object->$key;
		}
	}
	return $result;
}
