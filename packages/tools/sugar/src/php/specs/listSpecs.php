<?php

namespace Sugar\specs;

/**
 * @name        listSpecs
 * @namespace   php.specs
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This method allows you to list all the available spec files inside a particular namespace(s), or simply all.
 *
 * @param       {String}        $namespaces         An array of namespaces to list the specs from. If not set, list all the specs from all the namespaces
 * @param       {Object}            $sJsonSettings         Some settings to pass to the SJson class like the rootDirs, etc...
 * @return      {Any}                               A list of all the specs files available
 *
 * @snippet             \Sugar\specs\listSpecs();
 *
 * @example       twig
 * $specs = \Sugar\specs\listSpecs();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function listSpecs($namespaces = [], $settings = [])
{
    $settings = array_merge_recursive((array) $settings, [
        'namespaces' => [
            'sugar.views' => [realpath(__DIR__ . '/../../views')],
        ],
    ]);
    $specs = new \SSpecs($settings);
    $spec = $specs->list($namespaces);
    return $spec;
}
