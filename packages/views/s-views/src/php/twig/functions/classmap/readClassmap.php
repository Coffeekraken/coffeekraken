<?php

/**
 * @name            readClassmap
 * @namespace            php.twig.functions.classmap
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to read the `classmap.json` file
 *
 * @param       {Object}            $sClassmapSettings         Some settings to pass to the SClassmap class like the path, etc...
 * @return      {Object}                                        The classmap json
 *
 * @snippet             __readClassmap()
 *
 * @example         twig
 * <code>
 *  {{ __readClassmap() }}
 * </code>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__readClassmap', function (
    $sClassmapSettings = []
) {
    return \Sugar\classmap\readClassmap($sClassmapSettings);
});
