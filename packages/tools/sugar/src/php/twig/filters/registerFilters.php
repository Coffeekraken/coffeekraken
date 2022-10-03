<?php

namespace Sugar\twig;

/**
 * @name        registerFilter
 * @namespace   php.filters
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function allows you to register only the filters on your twig instance
 *
 * @param       {Twig}      $twig           The twig instance on which to register the filters
 * @return      {Twig}                      The twig instance
 *
 * @example       php
 * \STwig\registerFilters($twig);
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

    return $twig;
}
