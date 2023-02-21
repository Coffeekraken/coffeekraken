<?php

/**
 * @name        idCompliant
 * @namespace   php.twig.filters.string
 * @type        TwigFilter
 * @platform    twig
 * @status      beta
 *
 * This twig filter allows you to ensure a string is "html" id compliant
 *
 * @param       {String}            $value          The value you want to make id compliant
 * @return      {String}                        The id compliant version
 *
 * @example       twig
 * {% set id = 'something cool'|__idCompliant %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('__idCompliant', function ($value) {
    return \Sugar\string\idCompliant($value);
});
