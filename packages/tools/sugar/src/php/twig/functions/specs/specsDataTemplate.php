<?php

/**
 * @name            specsDataTemplate
 * @namespace            php.twig.functions.specs
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to print the `<template s-specs-values>...</template>` template only if the $_ENV['S_SPECS_DATA'] is setted to true.
 *
 * @param      {String}            $data              The data to print in the attribute. Can contain "values", "specs" and "source"
 * @return      {String}                                The `<template>` tag containing your data
 *
 * @snippet             __specsDataTemplate($1)
 *
 * @example         twig
 * {{ __specsDataTemplate(_context) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

function array_filter_recursive($input)
{
    foreach ($input as &$value) {
        if (is_array($value)) {
            $value = array_filter_recursive($value);
        }
    }

    return array_filter($input);
}

return new \Twig\TwigFunction('__specsDataTemplate', function ($data) {
    // check if the $_ENV['S_SPECS_DATA'] is set to true
    if (!isset($_ENV['S_SPECS_DATA']) || $_ENV['S_SPECS_DATA'] == false) {
        return '';
    }

    // clean context
    unset($data['frontspec']);
    unset($data['docmap']);
    unset($data['server']);
    unset($data['packageJson']);
    unset($data['config']);
    unset($data['configFiles']);
    unset($data['requestedConfig']);
    unset($data['menus']);
    unset($data['env']);
    unset($data['_sharedDataFilePath']);
    unset($data['shared']);
    unset($data['request']);

    // handle the "$specs" property
    $specs = (object) [];
    if (isset($data['$specs'])) {
        $specs = $data['$specs'];
        unset($data['$specs']);
    }

    // handle the "$source" property
    $source = (object) [];
    if (isset($data['$source'])) {
        $source = $data['$source'];
        unset($data['$source']);
    }

    // return ready to template JSON
    return '<template s-specs-data>{
        "source": ' .
        json_encode($source, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT) .
        ',
        "values": ' .
        json_encode(
            array_filter_recursive($data),
            JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT
        ) .
        ',
        "specs": ' .
        json_encode($specs, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT) .
        '
    }</template>';
});
