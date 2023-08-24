<?php

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
 * @snippet             __colorClasses($1)
 *
 * @example         php
 * <div class="{{ __colorClasses('wide') }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

return new \Twig\TwigFunction('__colorClasses', function (
    $color = null,
    $default = null
) {
    return \Sugar\css\colorClasses($color, $default);
});
