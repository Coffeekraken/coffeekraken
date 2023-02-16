<?php

/**
 * @name        props
 * @namespace   php.twig.functions.object
 * @type        TwigFilter
 * @status      beta
 * @platform    php
 *
 * This twig filter allows you to get back an array of object properties
 *
 * @param       {Object}            $object     The object to get props from
 * @return      {String[]}                      The array of object properties
 *
 * @example       twig
 * <div data="{{ myObject|props }}"></div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('props', function ($object) {
    if (is_string($object)) {
        $object = json_decode($object);
    }

    if (is_array($object)) {
        return array_keys($object);
    }

    return array_keys((array) $object);
});
