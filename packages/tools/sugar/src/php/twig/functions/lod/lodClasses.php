<?php
namespace Sugar\lod;

/**
 * @name        lodClasses
 * @namespace            php.twig.functions.lod
 * @type        TwigFunction
 * @platform        twig
 * @status          beta
 *
 * This function is about the lod system (level of details).
 * It generate the correct .s-lod--... classes depending on the requested level.
 *
 * @param       {Number}            $level          The lod level you want to generate classes for
 * @return      {String}                            The classes separated by spaces
 *
 * @snippet             __lodClasses($1)
 *
 * @example      php
 * <div classes="{{ __lodClasses(2) }}"></div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__lodClasses', function ($level) {
    return \Sugar\lod\lodClasses($level);
});
