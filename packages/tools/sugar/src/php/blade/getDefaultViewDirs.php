<?php

namespace Sugar\blade;

/**
 * @name        getDefaultViewDirs
 * @namespace   php.blade
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function gives you the default root directories where to search for views.
 * You will need to add these if you want to use the "@sugar" layouts, etc...
 *
 * @return      {String[]}                  The root directories for views
 *
 * @example       twig
 * $viewDirs = \Sugar\blade\getDefaultViewDirs();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function getDefaultViewDirs()
{
    return [realpath(__DIR__ . '/../../views/blade')];
}
