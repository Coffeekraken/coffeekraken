<?php

/**
 * @name            spacesClasses
 * @namespace            php.twig.css
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function takes an object|array of spaces issued from the themeMargin.config.ts configuration file like:
 * - "paddingTop" => 10
 * - "marginBottom" => 30
 * - etc...
 * This function will returns you the classes like "s-mbs:10" that you can apply where you want in your views.
 *
 * @param       {Array|Object}         $spaces           Some margins like "block" => 10, etc...
 * @param       {Array|Object}          [$frontspec=[]]     The frontspec json to handle things like defaultMedia, etc...
 * @return      {String}                         The resulting css classes
 *
 * @snippet             __spacesClasses($1)
 *
 * @example         php
 * <div class="{{ __spacesClasses({
 *  marginTop: 10
 * }) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__spacesClasses', function (
    $spaces,
    $frontspec = []
) {
    return \Sugar\css\spacesClasses($spaces, $frontspec);
});
