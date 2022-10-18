<?php

namespace Sugar\css;

/**
 * @name            marginClasses
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes an object|array of margins issued from the themeMargin.config.ts configuration file like:
 * - "blockStart" => 10
 * - "inlineEnd" => 30
 * - "block" => 10
 * - etc...
 * This function will returns you the classes like "s-mbs:10" that you can apply where you want in your views.
 *
 * @param       {Array|Object}         $margins           Some margins like "block" => 10, etc...
 * @return      {String}                         The resulting css classes
 *
 * @example         php
 * \Sugar\css\marginClasses([
 *      'block' => 20,
 *      'inlineEnd' => 10
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function marginClasses($margins = [])
{
    $margins = (array) $margins;
    $classes = [];

    if (isset($margins['block'])) {
        array_push($classes, 's-mb--' . $margins['block']);
    }
    if (isset($margins['inline'])) {
        array_push($classes, 's-mi--' . $margins['inline']);
    }

    if (isset($margins['blockStart'])) {
        array_push($classes, 's-mbs--' . $margins['blockStart']);
    }
    if (isset($margins['blockEnd'])) {
        array_push($classes, 's-mbe--' . $margins['blockEnd']);
    }
    if (isset($margins['inlineStart'])) {
        array_push($classes, 's-mis--' . $margins['inlineStart']);
    }
    if (isset($margins['inlineEnd'])) {
        array_push($classes, 's-mie--' . $margins['inlineEnd']);
    }

    return implode(' ', $classes);
}
