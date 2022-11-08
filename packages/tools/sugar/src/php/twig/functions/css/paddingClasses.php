<?php

/**
 * @name            paddingClasses
 * @namespace            php.twig.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function takes an object|array of paddings issued from the themeMargin.config.ts configuration file like:
 * - "blockStart" => 10
 * - "inlineEnd" => 30
 * - "block" => 10
 * - etc...
 * This function will returns you the classes like "s-mbs:10" that you can apply where you want in your views.
 *
 * @param       {Array|Object}         $paddings           Some paddings like "block" => 10, etc...
 * @param       {Array|Object}          [$frontspec=[]]     The frontspec json to handle things like defaultMedia, etc...
 * @return      {String}                         The resulting css classes
 *
 * @example         php
 * <div class="{{ paddingClasses({
 *  block: 10
 * }) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('paddingClasses', function (
    $paddings,
    $frontspec = []
) {
    return \Sugar\css\paddingClasses($paddings, $frontspec);
});
