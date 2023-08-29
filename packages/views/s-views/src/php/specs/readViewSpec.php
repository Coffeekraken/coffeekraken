<?php

namespace SViews\specs;

/**
 * @name        readViewsSpec
 * @namespace   php.specs
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function allows you to read a view specs.
 *
 * @param      {String}            $jsonDotPath            The dotpath relative to any $settings->rootDirs specified directories
 * @param       {Object}            $sJsonSettings         Some settings to pass to the SJson class like the rootDirs, etc...
 * @return      {any}                                      The getted value. Can be an entire object, or a simple (string|boolean|...) value depending on the passed $jsonDotPath
 *
 * @snippet             \SViews\specs\readViewsSpec($1);
 *
 * @example       twig
 * $value = \SViews\specs\readViewsSpec('my.cool.viewspec);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function readViewsSpec(string $specDotPath, $settings = [])
{
    $settings = array_merge_recursive((array) $settings, [
        'namespaces' => [
            'sugar.views' => [realpath(__DIR__ . '/../../views/sugar')],
        ],
    ]);

    $specs = new \SSpecs($settings);
    $spec = $specs->read($specDotPath);
    return $spec;
}
