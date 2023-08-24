<?php

namespace SViews\specs;

/**
 * @name        listViewsSpecs
 * @namespace   php.specs
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This method allows you to list all the available spec files inside the sugar.views namespace.
 *
 * @param       {Object}            $sJsonSettings         Some settings to pass to the SJson class like the rootDirs, etc...
 * @return      {Any}                               A list of all the specs files available
 *
 * @snippet             \Sugar\specs\listViewsSpecs();
 *
 * @example       twig
 * $specs = \Sugar\specs\listViewsSpecs();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function listViewsSpecs($settings = [])
{
    $settings = array_merge_recursive((array) $settings, [
        'namespaces' => [
            'sugar.views' => [realpath(__DIR__ . '/../../views')],
        ],
    ]);
    $specs = new \SSpecs($settings);
    $spec = $specs->list('sugar.views');
    return $spec;
}
