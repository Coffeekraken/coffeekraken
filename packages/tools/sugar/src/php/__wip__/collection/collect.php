<?php

namespace thorin;

/**
 * Create a [collection instance](https://laravel.com/docs/5.7/collections#available-methods) to work with from the passed array.
 * @param    {Array}    $array    The array to create the collection from
 * @return    {Collection}    The collection instance around the passed array
 *
 * @example    php
 * Thorin::collect(['taylor', 'abigail', null])
 * ->reject(function ($name) {
 *   return empty($name);
 * })
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://packagist.org/packages/tightenco/collect
 */
function collect($array) {
	return \collect($array);
}
