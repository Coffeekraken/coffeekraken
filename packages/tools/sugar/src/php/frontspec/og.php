<?php

namespace Sugar\frontspec;

/**
 * @name            og
 * @namespace       php.frontspec
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Print the passed "og" from the frontspec
 *
 * @param     {Object}     $frontspec        The frontspec object containing the "og" property
 * @return    {String}    The HTML code of the og
 *
 * @example    php
 * \Sugar\frontspec\og($frontspec);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function og($frontspec)
{
    if (!$frontspec) {
        $frontspecInstance = new SFrontspec();
        $frontspec = $frontspecInstance->read();
    }

    $frontspec = \Sugar\convert\toObject($frontspec);

    if (!isset($frontspec->og)) {
        return '';
    }

    $og = $frontspec->og;
    $ogStr = [];
    $props = array_keys((array) $og);
    foreach ($props as $prop) {
        if ($og->$prop) {
            array_push(
                $ogStr,
                '<meta property="og:' .
                    $prop .
                    '" content="' .
                    $og->$prop .
                    '" />'
            );
        }
    }
    return implode(PHP_EOL, $ogStr);
}
