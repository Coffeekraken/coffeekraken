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
 * @param     {Object}     [$frontspec=null]        The frontspec object containing the "og" property
 * @return    {String}    The HTML code of the og
 *
 * @snippet             \Sugar\frontspec\og($1);
 *
 * @example    php
 * \Sugar\frontspec\og($frontspec);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function og($frontspec = null)
{
    if (!$frontspec || !isset($frontspec->metas->og)) {
        $frontspecInstance = new \SFrontspec();
        $frontspec = $frontspecInstance->read();
    }

    if (!isset($frontspec->metas->og)) {
        return '<!-- frontspec: No open graph metas found... -->';
    }

    $frontspec = \Sugar\convert\toObject($frontspec);

    if (!isset($frontspec->metas->og)) {
        return '';
    }

    $og = $frontspec->metas->og;
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
