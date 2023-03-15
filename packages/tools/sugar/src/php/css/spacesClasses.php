<?php

namespace Sugar\css;

/**
 * @name            spacesClasses
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes an object|array of spaces (paddingTop, paddingLeft, marginTop, marginBottom, etc...) issued from the themePadding.config.ts configuration file like:
 * - "paddingTop" => 10
 * - "paddingRight" => 30
 * - etc...
 * This function will returns you the classes like "s-pbs:10" that you can apply where you want in your views.
 *
 * @param       {Array|Object}         $spaces           Some spaces like paddingTop, marginRight, etc...
 * @param       {Array|Object}          [$frontspec=[]]     The frontspec json to handle things like defaultMedia, etc...
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\spacesClasses($1);
 *
 * @example         php
 * \Sugar\css\spacesClasses([
 *      'marginTop' => 20,
 *      'paddingBottom' => 10
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function spacesClasses($spaces = [], $frontspec = [])
{
    $paddings = \Sugar\css\paddingClasses($spaces);
    $margins = \Sugar\css\marginClasses($spaces);
    return implode(' ', [$paddings, $margins]);
}
