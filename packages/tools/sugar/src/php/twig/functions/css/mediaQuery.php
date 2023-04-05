<?php

/**
 * @name            mediaQuery
 * @namespace            php.twig.functions
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function take a media name from that's defined in the frontspec.json file and returns you the proper
 * media query based on that.
 * If the passed media does not exists, it just returns it. It allows you to handle custom media queries with ease.
 * Note that this function does not return the "@media" starting keyword.
 *
 * @param       {String}        $media              The media name or query you want
 * @return      {String}                         The resulting media query string
 *
 * @snippet             __mediaQuery($1);
 *
 * @example         twig
 * {% set query = __mediaQuery('mobile') %}
 * <source srcset="..." media="{{ query }}">
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__mediaQuery', function ($media) {
    return \Sugar\css\mediaQuery($media);
});
