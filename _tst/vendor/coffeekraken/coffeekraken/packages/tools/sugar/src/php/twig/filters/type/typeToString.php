<?php

/**
 * @name        typeToString
 * @namespace   php.twig.filters.type
 * @type        TwigFilter
 * @status      beta
 * @platform    php
 *
 * This twig filter allows you to convert a type array to a string is needed
 *
 * @param       {String|Array}            $type       The type you want to convert to string.
 * @return      {String}                                The type string
 *
 * @example       twig
 * {% set id = 'Array'|typeToString %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('typeToString', function ($type) {
    return \Sugar\type\typeToString($type);
});
