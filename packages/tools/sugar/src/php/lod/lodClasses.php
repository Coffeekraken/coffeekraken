<?php
namespace Sugar\lod;

/**
 * @name        lodClasses
 * @namespace            php.lod
 * @type        Function
 * @platform        php
 * @status          beta
 *
 * This function is about the lod system (level of details).
 * It generate the correct .s-lod--... classes depending on the requested level.
 *
 * @param       {Number}            $level          The lod level you want to generate classes for
 * @return      {String}                            The classes separated by spaces
 *
 * @example      php
 * Sugar\lod\lodClasses(2); // => .s-lod .s-lod--0 .s-lod--1 .s-lod--2
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function lodClasses($level)
{
    $cls = ['s-lod'];
    for ($i = 0; $i <= $level; $i++) {
        array_push($cls, 's-lod--' . $i);
    }
    return implode(' ', $cls);
}
