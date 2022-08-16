<?php

namespace STwig;

/**
 * @name        registerFunctions
 * @namespace   php.functions
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function allows you to register only the functions on your twig instance
 *
 * @param       {Twig}      $twig           The twig instance on which to register the functions
 * @return      {Twig}                      The twig instance
 *
 * @example        php
 * \STwig\registerFunctions($twig);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function registerFunctions($twig)
{
    $toArray = require_once 'cast/toArray.php';
    $twig->addFunction($toArray);

    $frontspecAssets = require_once 'frontspec/assets.php';
    $twig->addFunction($frontspecAssets);

    $frontspecOg = require_once 'frontspec/og.php';
    $twig->addFunction($frontspecOg);

    return $twig;
}
