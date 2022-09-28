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
 * @param       {Object}            $metas      The metas you want to print out
 * @return      {Array}                        The html representing the metas
 *
 * @example       twig
 * {% frontspecMetas(fronspec.metas) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('frontspecMetas', function ($metas) {
    return \Sugar\frontspec\metas($metas);
});
