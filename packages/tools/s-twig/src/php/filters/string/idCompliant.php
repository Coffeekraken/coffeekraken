<?php

/**
 * @name        idCompliant
 * @namespace   php.filters.string
 * @type        TwigFilter
 * @status      beta
 * @platform    php
 *
 * This twig filter allows you to ensure a string is "html" id compliant
 *
 * @param       {String}            $value          The value you want to make id compliant
 * @return      {String}                        The id compliant version
 *
 * @example       twig
 * {% set id = 'something cool'|idCompliant %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('idCompliant', function ($value) {
    return \Sugar\string\idCompliant($value);
});
