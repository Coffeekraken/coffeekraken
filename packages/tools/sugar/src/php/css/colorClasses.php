<?php

namespace Sugar\css;

/**
 * @name            colorClasses
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function will simply return the "s-color" classes depending on the color you want like "main", "accent", etc...
 * You can also pass an array/object with the property "value"
 *
 * @param       {Number|String|Array|Object}            [color=null]              The color you want
 * @param       {Number|String}         [default=null]          The default color value if not specified
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\colorClasses($1);
 *
 * @example         php
 * \Sugar\css\colorClasses(10);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function colorClasses($color = null, $default = null)
{
    if (is_array($color)) {
        $color = $color['value'];
    } elseif (is_object($color)) {
        $color = $color->value;
    }

    if (!$color && $default != null) {
        $color = $default;
    }

    if (!$color) {
        return '';
    }
    return 's-color s-color-' . $color;
}
