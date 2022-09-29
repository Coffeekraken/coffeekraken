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
    $toArray = require_once 'cast/toArray.php';
    $twig->addFunction($toArray);

    // Cast
    $toObject = require_once 'cast/toObject.php';
    $twig->addFunction($toObject);

    // Css
    $layoutCss = require_once 'string/layoutCss.php';
    $twig->addFunction($layoutCss);

    // Frontspec
    $frontspecAssets = require_once 'frontspec/assets.php';
    $twig->addFunction($frontspecAssets);

    $frontspecOg = require_once 'frontspec/og.php';
    $twig->addFunction($frontspecOg);

    $frontspecMetas = require_once 'frontspec/metas.php';
    $twig->addFunction($frontspecMetas);

    // Html
    $attrs = require_once 'html/attrs.php';
    $twig->addFunction($attrs);

    // String
    $idCompliant = require_once 'string/idCompliant.php';
    $twig->addFunction($idCompliant);

    $uniqid = require_once 'string/uniqid.php';
    $twig->addFunction($uniqid);

    return $twig;
}
