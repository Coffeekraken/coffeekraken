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
 * <div {{ __attrs(attributes) }}></div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__attrs', function ($attributes, $exclude = []) {
    return \Sugar\html\attrs($attributes, $exclude);
});
