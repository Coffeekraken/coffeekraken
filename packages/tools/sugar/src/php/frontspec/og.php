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
 * @param     {Object}      The "og" object of the frontspec
 * @return    {String}    The HTML code of the og
 *
 * @example    php
 * \Sugar\frontspec\og($frontspec->og);
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function og($og)
{
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
