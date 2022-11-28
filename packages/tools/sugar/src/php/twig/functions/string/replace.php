<?php

/**
 * @name        replace
 * @namespace   php.twig.functions.string
 * @type        TwigFunction
 * @status      beta
 * @platform    php
 *
 * This twig function allows you to replace a value by another in your string
 *
 * @param       {String}            $search         The string to replace
 * @param       {String}            $replaceBy      The string to replace your $search with
 * @return      {String}                        The new string
 *
 * @example       twig
 * {% set str = 'hello world' %}
 * {% set id = replace(str, 'world', 'coco') %}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('replace', function (
    string $string,
    string $search,
    string $replaceBy
): string {
    return str_replace($search, $replaceBy, $string);
});
