<?php

/**
 * @name        idCompliant
 * @namespace   php.twig.functions.string
 * @type        TwigFunction
 * @platform    twig
 * @status      beta
 *
 * This twig function allows you to ensure that a string is "html" id compliant
 *
 * @param       {String}            $value          The value you want to make id compliant
 * @return      {String}                        The id compliant version
 *
 * @example       twig
 * {% set id = __idCompliant('something cool) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__idCompliant', function ($value) {
    return \Sugar\string\idCompliant($value);
});
