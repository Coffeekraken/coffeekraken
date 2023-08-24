<?php

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
 * @snippet             __spacingClasses($1)
 *
 * @example         php
 * <div class="{{ __spacingClasses('wide') }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

return new \Twig\TwigFunction('__spacingClasses', function (
    $spacing = null,
    $default = null
) {
    return \Sugar\css\spacingClasses($spacing, $default);
});
