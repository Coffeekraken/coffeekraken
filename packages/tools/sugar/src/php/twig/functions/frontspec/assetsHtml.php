<?php

/**
 * @name        assets
 * @namespace   php.twig.functions.frontspec
 * @type        TwigFunction
 * @status      beta
 * @platform    php
 *
 * This twig function allows you to print out the frontspec.json "assets" property
 *
 * @param       {Object}            $metas      The assets you want to print out
 * @return      {Array}                        The html representing the assets
 *
 * @example       twig
 * {% frontspecAssets(fronspec.assets) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('frontspecAssets', function (
    $assets,
    $cacheBuster
) {
    return \Sugar\frontspec\assets($assets, $cacheBuster);
});
