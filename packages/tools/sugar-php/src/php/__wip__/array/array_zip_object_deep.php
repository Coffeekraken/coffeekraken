<?php

namespace thorin;

/**
 * This method is like `Thorin::array_zip_object` except that it supports property paths.
 *
 * @param    {Array}    $props    The property identifiers
 * @param    {Array}    $values    The property values
 * @return    {Object}    The new object
 *
 * @example    php
 * Thorin::array_zip_object_deep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
 * /**
 * class stdClass#20 (1) {
 *  public $a => class stdClass#19 (1) {
 *      public $b =>
 *          array(2) {
 *              [0] => class stdClass#17 (1) {
 *                      public $c => int(1)
 *                  }
 *             [1] => class stdClass#18 (1) {
 *                  public $d => int(2)
 *                  }
 *          }
 *      }
 *  }
 * *\/
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/Array/zipObjectDeep.php
 */
function array_zip_object_deep(array $props = [], array $values = []): \stdClass {
	return \_::zipObjectDeep($props, $values);
}
