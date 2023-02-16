<?php

/**
 * @name            marginClasses
 * @namespace            php.twig.css
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
 * @param       {Array|Object}          [$frontspec=[]]     The frontspec json to handle things like defaultMedia, etc...
 * @return      {String}                         The resulting css classes
 *
 * @example         php
 * <div class="{{ marginClasses({
 *  block: 10
 * }) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('marginClasses', function (
    $margins,
    $frontspec = []
) {
    return \Sugar\css\marginClasses($margins, $frontspec);
});
