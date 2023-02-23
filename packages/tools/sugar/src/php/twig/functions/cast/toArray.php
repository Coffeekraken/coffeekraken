<?php

/**
 * @name        toArray
 * @namespace   php.twig.functions.cast
 * @type        TwigFunction
 * @platform    twig
 * @status      beta
 *
 * This twig function allows you to convert an object to an array
 *
 * @param       {Object}            $value          The value you want to cast to array
 * @return      {Array}                        The casted array value
 *
 * @snippet             __toArray($1)
 *
 * @example       twig
 * {% set obj = {'something':true} %}
 * {% set ar = __toArray(obj) %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__toArray', function ($value) {
    return (array) $value;
});
