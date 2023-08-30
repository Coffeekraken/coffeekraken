<?php

/**
 * @name            readViewsSpec
 * @namespace            php.twig.functions.specs
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to read a spec file like the "viewspec.json", "frontspec", etc... using the SSpecs class
 * that gives you the ability to reference other json and json props.
 *
 * @param      {String}            $jsonDotPath            The dotpath relative to any $settings->rootDirs specified directories
 * @param       {Object}            $sJsonSettings         Some settings to pass to the SJson class like the rootDirs, etc...
 * @return      {any}                                      The getted value. Can be an entire object, or a simple (string|boolean|...) value depending on the passed $jsonDotPath
 *
 * @snippet             __readViewsSpec($1)
 *
 * @example         twig
 * <code>
 *  {{ __readViewsSpec('sugar.views.component.card') }}
 * </code>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__readViewsSpec', function (
    $jsonDotPath,
    $sJsonSettings = []
) {
    return \SViews\specs\readViewsSpec($jsonDotPath, $sJsonSettings);
});
