<?php

namespace Sugar\path;

/**
 * @name            extension
 * @namespace       php.path
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * Return the extension of the passed path
 *
 * @param     {String}      The path to parse and get the extension from
 * @return    {String}    The extension of the passed path
 *
 * @example    php
 * \Sugar\path\extension('/path/to/file.ext'); // => ext
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function extension($path)
{
    return pathinfo($path)['extension'];
}
