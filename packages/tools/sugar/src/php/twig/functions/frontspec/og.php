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
 * @param       {Object}            $og      The og you want to print out
 * @return      {Array}                        The html representing the og
 *
 * @example       twig
 * {% frontspecOg(fronspec.og) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('frontspecOg', function ($ogObj) {
    return \Sugar\frontspec\og($ogObj);
});
