<?php

namespace Sugar\frontspec;

/**
 * @name            favicon
 * @namespace       php.frontspec
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Print the passed "favicon" from the frontspec
 *
 * @param     {Object}      [$frontspec=null]                  The frontspec object containing the "metas" property
 * @return    {String}    The HTML code of the favicon
 *
 * @snippet             \Sugar\frontspec\favicon($1);
 *
 * @example    php
 * \Sugar\frontspec\favicon($frontspec);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function favicon($frontspec = null)
{
    if ($frontspec) {
        $frontspec = \Sugar\convert\toObject($frontspec);
    } elseif (!$frontspec || !isset($frontspec->favicon)) {
        $frontspecInstance = new \SFrontspec();
        $frontspec = $frontspecInstance->read();
    }

    if (!isset($frontspec->favicon)) {
        return '<!-- frontspec: No favicon found... -->';
    }

    if (!isset($frontspec->favicon)) {
        return '<!-- No favicon has been found -->';
    }

    if (!file_exists($frontspec->favicon->filePath)) {
        return '<!-- No favicon has been found -->';
    }

    $html = file_get_contents($frontspec->favicon->filePath);
    return $html;
}
