<?php

namespace SViews\twig;

/**
 * @name        registerFilter
 * @namespace   php.twig.filters
 * @type        Function
 * @platform    php
 * @status      beta
 *
 * This function allows you to register only the filters on your twig instance
 *
 * @param       {Twig}      $twig           The twig instance on which to register the filters
 * @return      {Twig}                      The twig instance
 *
 * @snippet             \Sugar\twig\registerFilters($1);
 *
 * @example       php
 * \Sugar\twig\registerFilters($twig);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function registerFilters($twig)
{
    $toArray = require __DIR__ . '/cast/toArray.php';
    $twig->addFilter($toArray);

    $toObject = require __DIR__ . '/cast/toObject.php';
    $twig->addFilter($toObject);

    // objects
    $cleanContext = require __DIR__ . '/object/cleanContext.php';
    $twig->addFilter($cleanContext);

    $idCompliant = require __DIR__ . '/string/idCompliant.php';
    $twig->addFilter($idCompliant);

    $replace = require __DIR__ . '/string/replace.php';
    $twig->addFilter($replace);

    $typeToString = require __DIR__ . '/type/typeToString.php';
    $twig->addFilter($typeToString);

    return $twig;
}
