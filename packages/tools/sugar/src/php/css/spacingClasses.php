<?php

namespace Sugar\css;

/**
 * @name            spacingClasses
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function will simply return the "s-spacing" classes depending on the spacing you want like "10", "20", etc...
 * You can also pass an array/object with the property "value"
 *
 * @param       {Number|String|Array|Object}            [spacing=null]              The spacing you want
 * @param       {Number|String}         [default=null]          The default spacing value if not specified
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\spacingClasses($1);
 *
 * @example         php
 * \Sugar\css\spacingClasses(10);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function spacingClasses($spacing = null, $default = null)
{
    if (is_array($spacing)) {
        $spacing = $spacing['value'];
    } elseif (is_object($spacing)) {
        $spacing = $spacing->value;
    }

    if (!$spacing && $default != null) {
        $spacing = $default;
    }

    if (!$spacing) {
        return '';
    }
    return 's-spacing s-spacing-' . $spacing;
}
