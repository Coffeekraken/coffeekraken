<?php

/**
 * @name        toArray
 * @namespace   php.twig.functions.cast
 * @type        TwigFunction
 * @status      beta
 * @platform    php
 *
 * This twig function allows you to convert an object to an array
 *
 * @param       {Object}            $value          The value you want to cast to array
 * @return      {Array}                        The casted array value
 *
 * @example       twig
 * {% set obj = {'something':true} %}
 * {% set ar = toArray(obj) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('toArray', function ($value) {
    return (array) $value;
});
