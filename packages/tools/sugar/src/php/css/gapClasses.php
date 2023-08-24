<?php

namespace Sugar\css;

/**
 * @name            gapClasses
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function will simply return the "s-gap" classes depending on the gap you want like "10", "20", etc...
 * You can also pass an array/object with the property "value"
 *
 * @param       {Number|String|Array|Object}            [gap=null]              The gap you want
 * @param       {Number|String}         [default=null]          The default gap value if not specified
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\gapClasses($1);
 *
 * @example         php
 * \Sugar\css\gapClasses(10);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function gapClasses($gap = null, $default = null)
{
    if (is_array($gap)) {
        $gap = $gap['value'];
    } elseif (is_object($gap)) {
        $gap = $gap->value;
    }

    if (!$gap && $default != null) {
        $gap = $default;
    }

    if (!$gap) {
        return '';
    }
    return 's-gap s-gap-' . $gap;
}
