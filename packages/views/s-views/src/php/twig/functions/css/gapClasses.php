<?php

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
 * @snippet             __gapClasses($1)
 *
 * @example         php
 * <div class="{{ __gapClasses(20) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

return new \Twig\TwigFunction('__gapClasses', function (
    $gap = null,
    $default = null
) {
    return \Sugar\css\gapClasses($gap, $default);
});
