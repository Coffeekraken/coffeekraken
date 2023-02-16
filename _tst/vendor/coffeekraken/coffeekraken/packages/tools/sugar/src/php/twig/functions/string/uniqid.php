<?php

/**
 * @name        uniqid
 * @namespace   php.twig.functions.string
 * @type        TwigFunction
 * @status      beta
 * @platform    php
 *
 * This twig function allows you to generate a uniqid
 *
 * @return      {String}                        The generated uniqid
 *
 * @example       twig
 * {% set id = uniqid() %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('uniqid', function ($value) {
    return uniqid();
});
