<?php

/**
 * @name        og
 * @namespace   php.twig.functions.frontspec
 * @type        TwigFunction
 * @status      beta
 * @platform    php
 *
 * This twig function allows you to print out the frontspec.json "og" property
 *
 * @param       {Object}            [$frontspec=null]      The frontspec object from where to take the metas. If not specified, try to get it from the frontspec.json at the root of your project
 * @return      {Array}                        The html representing the og
 *
 * @example       twig
 * {% frontspecOg(frontspec) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('frontspecOg', function ($frontspec = null) {
    return \Sugar\frontspec\og($frontspec);
});
