<?php

/**
 * @name        toObject
 * @namespace   php.twig.functions.cast
 * @type        TwigFunction
 * @status      beta
 * @platform    php
 *
 * This twig function allows you to convert an array to an object
 *
 * @param       {Array}            $value          The value you want to cast to object
 * @return      {Object}                        The casted array value
 *
 * @example       twig
 * {% set obj = {'something':true} %}
 * {% set ar = toObject(obj) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('toObject', function ($value) {
    return (object) $value;
});
