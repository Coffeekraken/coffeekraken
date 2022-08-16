<?php

/**
 * @name        toArray
 * @namespace   php.filters.cast
 * @type        TwigFilter
 * @status      beta
 * @platform    php
 *
 * This twig filter allows you to convert an object to an array
 *
 * @param       {Object}            $value          The value you want to cast to array
 * @return      {Array}                        The casted array value
 *
 * @example       twig
 * {% set obj = {'something':true} %}
 * {% set ar = obj|toArray %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('toArray', function ($value) {
    return (array) $value;
});
