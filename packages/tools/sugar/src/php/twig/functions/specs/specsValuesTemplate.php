<?php

/**
 * @name            specsValuesTemplate
 * @namespace            php.twig.functions.specs
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to print the `<template s-specs-values>...</template>` template only if the $_ENV['S-SPECS-VALUES'] is setted to true.
 *
 * @param      {String}            $values              The values to print in the attribute
 * @return      {String}                                The `s-specs-values="{...}"` attribute containing your values
 *
 * @snippet             __specsValuesTemplate($1)
 *
 * @example         twig
 * {{ __specsValuesTemplate(_context) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__specsValuesTemplate', function ($values) {
    // check if the $_ENV['S_SPECS_VALUES'] is set to true
    if (!isset($_ENV['S_SPECS_VALUES']) || $_ENV['S_SPECS_VALUES'] == false) {
        return '';
    }

    // clean context
    unset($values['frontspec']);
    unset($values['docmap']);
    unset($values['server']);
    unset($values['packageJson']);
    unset($values['config']);
    unset($values['configFiles']);
    unset($values['requestedConfig']);
    unset($values['menus']);
    unset($values['env']);
    unset($values['_sharedDataFilePath']);
    unset($values['shared']);
    unset($values['request']);

    // return ready to attr JSON
    return '<template s-specs-values>' . json_encode($values) . '</template>';
});
