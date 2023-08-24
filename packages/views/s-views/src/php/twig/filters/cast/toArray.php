<?php

/**
 * @name        toArray
 * @namespace   php.twig.filters.cast
 * @type        TwigFilter
 * @platform    twig
 * @status      beta
 *
 * This twig filter allows you to convert an object to an array
 *
 * @param       {Object}            $value          The value you want to cast to array
 * @return      {Array}                        The casted array value
 *
 * @snippet             __toArray
 *
 * @example       twig
 * {% set obj = {'something':true} %}
 * {% set ar = obj|__toArray %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('__toArray', function ($value) {
    return (array) $value;
});
