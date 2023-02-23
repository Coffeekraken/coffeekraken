<?php

namespace Sugar\twig;

/**
 * @name        initTwig
 * @namespace   php.twig
 * @type        Function
 * @platform    php
 * @status      beta
 *
 * This function init your twig to have access to helpers delivered from the "coffeekraken/sugar" package like "toArray", "idCompliant", and many more...
 * These helpers/functions are used inside the @coffeekraken layouts, views, etc... so you will need to init your twig using this function.
 *
 * @param       {Twig}                $twig         Your twig instance
 * @param       {TwigLoader}            $loader         Your twig loader to be able to register default layout directories, etc...
 * @return      {Twig}                              The inited twig
 *
 * @snippet             \Sugar\twig\initTwig($1);
 *
 * @example       twig
 * $twig = \Sugar\twig\initTwig($twig);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function initTwig($twig, $loader = null)
{
    // register functions and filters
    require_once __DIR__ . '/filters/registerFilters.php';
    require_once __DIR__ . '/functions/registerFunctions.php';
    $twig = \Sugar\twig\registerFilters($twig);
    $twig = \Sugar\twig\registerFunctions($twig);

    // if loader is passed and is an filesystem one,
    // register the @coffeekraken namespaces
    if ($loader and method_exists($loader, 'addPath')) {
        $defaultViewDirs = \Sugar\twig\getDefaultViewDirs();
        foreach ($defaultViewDirs as $path) {
            $loader->addPath($path);
        }
    }

    return $twig;
}
