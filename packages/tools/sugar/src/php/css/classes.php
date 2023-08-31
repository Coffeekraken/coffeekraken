<?php

namespace Sugar\css;

/**
 * @name            classes
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function will simple return the corresponding classes for things like:
 * - color: \Sugar\css\colorClasses($color);
 * - container: \Sugar\css\containerClasses($type);
 * - gap: \Sugar\css\gapClasses($gap);
 * - margin: \Sugar\css\marginClasses($margin);
 * - padding: \Sugar\css\paddingClasses($padding);
 * - spaces: \Sugar\css\spacesClasses($spaces);
 * - spacing: \Sugar\css\spacingClasses($spacing);
 *
 * @param       {Array|Object}            classes              The classes parameters you want for each type (color, margin, etc...)
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\classes($1);
 *
 * @example         php
 * \Sugar\css\classes([
 *      'color' => 'accent',
 *      'margin' => 30
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function classes($classes)
{
    $finalClasses = [];
    if (isset($classes['color'])) {
        $finalClasses[] = colorClasses($classes['color']);
    }
    if (isset($classes['container'])) {
        $finalClasses[] = containerClasses($classes['container']);
    }
    if (isset($classes['gap'])) {
        if (is_array($classes['gap'])) {
            $finalClasses[] = gapClasses(
                $classes['gap'][0],
                $classes['gap'][1]
            );
        } else {
            $finalClasses[] = gapClasses($classes['spacing']);
        }
    }
    if (isset($classes['margin'])) {
        $finalClasses[] = marginClasses($classes['margin']);
    }
    if (isset($classes['padding'])) {
        $finalClasses[] = paddingClasses($classes['padding']);
    }
    if (isset($classes['spaces'])) {
        $finalClasses[] = spacesClasses($classes['spaces']);
    }
    if (isset($classes['spacing'])) {
        if (is_array($classes['spacing'])) {
            $finalClasses[] = spacingClasses(
                $classes['spacing'][0],
                $classes['spacing'][1]
            );
        } else {
            $finalClasses[] = spacingClasses($classes['spacing']);
        }
    }

    return implode(' ', $finalClasses);
}
