<?php

/**
 * @name            classes
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function will simple return the corresponding classes for things like:
 * - color: __colorClasses($color);
 * - container: __containerClasses($type);
 * - gap: __gapClasses($gap);
 * - margin: __marginClasses($margin);
 * - padding: __paddingClasses($padding);
 * - spaces: __spacesClasses($spaces);
 * - spacing: __spacingClasses($spacing);
 *
 * @param       {Array|Object}            classes              The classes parameters you want for each type (color, margin, etc...)
 * @return      {String}                         The resulting css classes
 *
 * @snippet         __classes($1);
 *
 * @example         php
 * __classes([
 *      'color' => 'accent',
 *      'margin' => 30
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__classes', function ($classes) {
    return \Sugar\css\classes($classes);
});
