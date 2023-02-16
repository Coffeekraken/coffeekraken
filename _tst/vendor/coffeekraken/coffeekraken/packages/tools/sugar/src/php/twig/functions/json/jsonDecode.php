<?php

/**
 * @name        jsonDecode
 * @namespace   php.twig.functions.json
 * @type        TwigFilter
 * @status      beta
 * @platform    php
 *
 * This twig function allows you to decode a json string into a usable twig object
 *
 * @param       {String}            $json       The json string to decode
 * @return      {Object}                        The decoded json object
 *
 * @example       twig
 * <div data="{{ myJson|jsonDecode }}"></div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('jsonDecode', function ($json) {
    if (!is_string($json)) {
        return $json;
    }

    $decodedJson = (object) [];
    try {
        $decodedJson = json_decode($json, false, 512, JSON_THROW_ON_ERROR);
    } catch (\JsonException $exception) {
        echo $exception->getMessage(); // displays "Syntax error"
    }

    return $decodedJson;
});
