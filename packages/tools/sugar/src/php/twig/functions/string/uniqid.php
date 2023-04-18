<?php

/**
 * @name        uniqid
 * @namespace   php.twig.functions.string
 * @type        TwigFunction
 * @platform    twig
 * @status      beta
 *
 * This twig function allows you to generate a uniqid
 *
 * @return      {String}                        The generated uniqid
 *
 * @snippet             __uniqid()
 *
 * @example       twig
 * {% set id = __uniqid() %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__uniqid', function () {
    return uniqid();
});
