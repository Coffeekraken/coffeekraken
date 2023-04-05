<?php

namespace Sugar\css;

/**
 * @name            mediaQuery
 * @namespace            php.css
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
 * @snippet             \Sugar\css\mediaQuery($1);
 *
 * @example         twig
 * \Sugar\css\mediaQuery('mobile');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function mediaQuery($media)
{
    $query = \Sugar\css\buildMediaQuery($media);
    $query = str_replace('@media', '', $query);
    $query = str_replace('@container', '', $query);
    return trim($query);
}
