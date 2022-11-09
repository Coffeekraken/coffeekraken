<?php

namespace Sugar\frontspec;

/**
 * @name            sortMedia
 * @namespace       php.frontspec
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function take as input the "media" property of the `frontspec.json` file and return
 * a new object mostly the same but with the "queries" object|array sorted depending on the
 * "defaultAction" property.
 *
 * @param     {Object}      $media                      The frontspec "media" object
 * @return    {Object}                                  The same object with the "queries" sorted correctly
 *
 * @example    php
 * \Sugar\frontspec\sortMedia($frontspec->media);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function sortMedia($media)
{
    $media = \Sugar\convert\toObject($media);

    if (!isset($media->defaultAction)) {
        return $media;
    }

    $queries = \Sugar\object\sort($media->queries, function ($a, $b) use (
        $media
    ) {
        $a = (object) $a;
        $b = (object) $b;
        if ($media->defaultAction == '<=') {
            return $a->value->minWidth < $b->value->minWidth ? 1 : -1;
        } elseif ($media->defaultAction == '>=') {
            return $a->value->minWidth > $b->value->minWidth ? 1 : -1;
        }
        return 0;
    });

    // override original queries
    $media->queries = $queries;

    // return new media object
    return $media;
}
