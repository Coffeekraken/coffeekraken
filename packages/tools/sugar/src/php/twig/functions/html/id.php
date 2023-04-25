<?php

/**
 * @name            id
 * @namespace            php.twig.functions.html
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to print either the passed id, or a completely new uniq one
 *
 * @param       {String}         [$id=null]                The id to use
 * @return      {String}                         The resulting id attribute html
 *
 * @snippet             __id($1)
 *
 * @example         twig
 * <div {{ __id(myId) }}></div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__id', function ($id) {
    if (isset($id['value'])) {
        return 'id="' . $id['value'] . '"';
    }
    if (isset($id)) {
        return 'id="' . $id . '"';
    }
    return '';
});
