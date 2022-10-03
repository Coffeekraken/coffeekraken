<?php

namespace Sugar\twig;

/**
 * @name        registerFunctions
 * @namespace   php.twig.functions
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
 * \Sugar\twig\registerFunctions($twig);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function registerFunctions($twig)
{
    // Array
    $toArray = require_once __DIR__ . '/cast/toArray.php';
    $twig->addFunction($toArray);

    // Cast
    $toObject = require_once __DIR__ . '/cast/toObject.php';
    $twig->addFunction($toObject);

    // Css
    $layoutCss = require_once __DIR__ . '/css/layoutCss.php';
    $twig->addFunction($layoutCss);

    // Frontspec
    $frontspecAssets = require_once __DIR__ . '/frontspec/assets.php';
    $twig->addFunction($frontspecAssets);

    $frontspecOg = require_once __DIR__ . '/frontspec/og.php';
    $twig->addFunction($frontspecOg);

    $frontspecMetas = require_once __DIR__ . '/frontspec/metas.php';
    $twig->addFunction($frontspecMetas);

    // Html
    $attrs = require_once __DIR__ . '/html/attrs.php';
    $twig->addFunction($attrs);

    // String
    $idCompliant = require_once __DIR__ . '/string/idCompliant.php';
    $twig->addFunction($idCompliant);

    $uniqid = require_once __DIR__ . '/string/uniqid.php';
    $twig->addFunction($uniqid);

    return $twig;
}
