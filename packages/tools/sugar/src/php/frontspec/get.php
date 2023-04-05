<?php

namespace Sugar\frontspec;

/**
 * @name            get
 * @namespace            php.twig.functions.frontspec
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to read the `frontspec.json` file
 * and to get back a value.
 *
 * @snippet             \Sugar\frontspec\get('media');
 *
 * @param       {String}            $dotpath            The dotpath you want to get back
 * @return      {Any}                                        The requested value
 *
 * @example         php
 * \Sugar\frontspec\get('media');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function get($dotpath)
{
    $frontspec = \Sugar\frontspec\readFrontspec();
    return \Sugar\object\get($frontspec, $dotpath);
}
