<?php

/**
 * @name        toObject
 * @namespace   php.twig.filters.cast
 * @type        TwigFilter
 * @platform    trig
 * @status      beta
 *
 * This twig filter allows you to convert an array to an object
 *
 * @param       {Array}            $value          The value you want to cast to object
 * @return      {Object}                        The casted array value
 *
 * @snippet             __toObject
 *
 * @example       twig
 * {% set obj = {'something':true} %}
 * {% set ar = obj|__toObject %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('__toObject', function ($value) {
    return (object) $value;
});
