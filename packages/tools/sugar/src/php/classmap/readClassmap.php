<?php

namespace Sugar\classmap;

/**
 * @name            readClassmap
 * @namespace            php.twig.functions.classmap
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to read the `frontspec.json` file
 *
 * @snippet             \Sugar\classmap\readClassmap();
 *
 * @param       {Object}            $sClassmalSettings         Some settings to pass to the SClassmap class like the path, etc...
 * @return      {Object}                                        The classmap json
 *
 * @example         php
 * \Sugar\classmap\readClassmap();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function readClassmap($sClassmapSettings = [])
{
    $classmap = new \SClassmap($sClassmalSettings);
    return $classmap->read();
}
