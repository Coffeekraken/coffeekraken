<?php

/**
 * @name            attrs
 * @namespace            php.twig.functions.html
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to generate an html attributes string from a key=>pair object
 *
 * @param       {Object}         $attributes
 * @return      {String}                         The resulting html string
 *
 * @example         twig
 * <div {{ attrs(attributes) }}></div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('attrs', function ($attributes, $exclude = []) {
    $attrsAr = [];
    if (!isset($attributes)) {
        return '';
    }
    foreach ($attributes as $attr => $value) {
        if (in_array($attr, $exclude)) {
            continue;
        }
        array_push($attrsAr, $attr . '="' . $value . '"');
    }
    return implode(' ', $attrsAr);
});
