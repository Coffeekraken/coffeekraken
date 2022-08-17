<?php

namespace SViewRenderer;

/**
 * @name        initTwig
 * @namespace   php.twig
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function init your twig to have access to helpers delivered from the "coffeekraken/s-twig" package like "toArray", "idCompliant", and many more...
 * These helpers/functions are used inside the @coffeekraken layouts, views, etc... so you will need to init your twig using this function.
 *
 * @param       {Twig}                $twig         Your twig instance
 * @param       {TwigLoader}            $loader         Your twig loader to be able to register default layout directories, etc...
 * @return      {Twig}                              The inited twig
 *
 * @example       twig
 * $twig = \SViewRenderer\initTwig($twig, $loader);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function initTwig($twig, $loader = null)
{
    // init the passed twig instance with all the
    // STwig power
    $twig = \STwig\initTwig($twig);

    // if loader is passed and is an filesystem one,
    // register the @coffeekraken namespaces
    if ($loader and method_exists($loader, 'addPath')) {
        $defaultViewDirs = \SViewRenderer\getDefaultViewDirs();
        foreach ($defaultViewDirs as $path) {
            $loader->addPath($path, 'coffeekraken');
        }
    }

    return $twig;
}
