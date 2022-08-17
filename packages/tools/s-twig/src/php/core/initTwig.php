<?php

namespace STwig;

/**
 * @name        initTwig
 * @namespace   php.core
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function init your twig to have access to helpers delivered from the "coffeekraken/s-twig" package like "toArray", "idCompliant", and many more...
 * These helpers/functions are used inside the @coffeekraken layouts, views, etc... so you will need to init your twig using this function.
 *
 * @param       {Twig}                $twig         Your twig instance
 * @return      {Twig}                              The inited twig
 *
 * @example       twig
 * $twig = \STwig\initTwig($twig);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function initTwig($twig)
{
    $twig = \STwig\registerFilters($twig);
    $twig = \STwig\registerFunctions($twig);
    return $twig;
}
