<?php

/**
 * @name        toObject
 * @namespace   php.filters.cast
 * @type        TwigFilter
 * @status      beta
 * @platform    php
 *
 * This twig filter allows you to convert an array to an object
 *
 * @param       {Array}            $value          The value you want to cast to object
 * @return      {Object}                        The casted array value
 *
 * @example       twig
 * {% set obj = {'something':true} %}
 * {% set ar = obj|toObject %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('toObject', function ($value) {
    return (object) $value;
});
