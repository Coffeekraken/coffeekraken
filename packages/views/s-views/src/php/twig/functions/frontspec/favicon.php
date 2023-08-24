<?php

/**
 * @name        favicon
 * @namespace   php.twig.functions.frontspec
 * @type        TwigFunction
 * @platform    twig
 * @status      beta
 *
 * This twig function allows you to print out the frontspec.json "favicon" property
 *
 * @param       {Object}            [$frontspec=null]      The frontspec object from where to take the metas. If not specified, try to get it from the frontspec.json at the root of your project
 * @return      {Array}                        The html representing the metas
 *
 * @snippet             __frontspecFavicon($1)
 *
 * @example       twig
 * {% __frontspecFavicon(fronspec) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__frontspecFavicon', function (
    $frontspec = null
) {
    return \Sugar\frontspec\favicon($frontspec);
});
