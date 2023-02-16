<?php

/**
 * @name        metas
 * @namespace   php.twig.functions.frontspec
 * @type        TwigFunction
 * @status      beta
 * @platform    php
 *
 * This twig function allows you to print out the frontspec.json "metas" property
 *
 * @param       {Object}            [$frontspec=null]      The frontspec object from where to take the metas. If not specified, try to get it from the frontspec.json at the root of your project
 * @return      {Array}                        The html representing the metas
 *
 * @example       twig
 * {% frontspecMetas(fronspec) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('frontspecMetas', function ($frontspec = null) {
    return \Sugar\frontspec\metas($frontspec);
});
