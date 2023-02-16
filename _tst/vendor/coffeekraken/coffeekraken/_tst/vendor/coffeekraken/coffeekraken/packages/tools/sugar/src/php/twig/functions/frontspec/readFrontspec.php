<?php

/**
 * @name            readFrontspec
 * @namespace            php.twig.functions.frontspec
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to read the `frontspec.json` file
 *
 * @param       {Object}            $sFrontspecSettings         Some settings to pass to the SFrontspec class like the path, etc...
 * @return      {Object}                                        The frontspec json
 *
 * @example         twig
 * <code>
 *  {{ readFrontspec() }}
 * </code>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('readFrontspec', function (
    $sFrontspecSettings = []
) {
    return \Sugar\frontspec\readFrontspec($sFrontspecSettings);
});
