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
 * @param     {Object}      $frontspec                  The frontspec object containing the "metas" property
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
function favicon($frontspec)
{
    if (!$frontspec) {
        $frontspecInstance = new SFrontspec();
        $frontspec = $frontspecInstance->read();
    }

    $frontspec = \Sugar\convert\toObject($frontspec);

    if (!isset($frontspec->favicon)) {
        return '<!-- No favicon has been found -->';
    }

    $htmlPath =
        $frontspec->frontspec->folderPath .
        '/' .
        str_replace('./', '', $frontspec->favicon->filePath);

    if (!file_exists($htmlPath)) {
        return '<!-- No favicon has been found -->';
    }

    $html = file_get_contents($htmlPath);
    return $html;
}
