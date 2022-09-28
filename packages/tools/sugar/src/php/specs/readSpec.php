<?php

namespace Sugar\specs;

/**
 * @name        readSpec
 * @namespace   php.specs
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function allows you to read a spec file like the "viewspec.json", "frontspec", etc... using the SSpecs class
 * that gives you the ability to reference other json and json props.
 *
 * @param      {String}            $jsonDotPath            The dotpath relative to any $settings->rootDirs specified directories
 * @param       {Object}            $sJsonSettings         Some settings to pass to the SJson class like the rootDirs, etc...
 * @return      {any}                                      The getted value. Can be an entire object, or a simple (string|boolean|...) value depending on the passed $jsonDotPath
 *
 * @example       twig
 * $value = \Sugar\specs\readSpec('my.cool.viewspec);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function readSpec(string $specDotPath, $settings = [])
{
    $settings = array_merge_recursive((array) $settings, [
        'namespaces' => [
            'sugar.views' => [realpath(__DIR__ . '/../../views/specs')],
            'sugar.blade' => [realpath(__DIR__ . '/../../views/blade/@sugar')],
            'sugar.twig' => [realpath(__DIR__ . '/../../views/twig')],
        ],
    ]);
    $specs = new \SSpecs($settings);
    $spec = $specs->read($specDotPath);
    return $spec;
}
