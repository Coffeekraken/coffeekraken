<?php

/**
 * @name            specsValues
 * @namespace            php.twig.functions.specs
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to print the `s-specs-values="{...}"` attribute only if the $_ENV['S-SPECS-VALUES'] is setted to true.
 *
 * @param      {String}            $values              The values to print in the attribute
 * @return      {String}                                The `s-specs-values="{...}"` attribute containing your values
 *
 * @example         twig
 * <div {{ __specsValues(_context) }}>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__specsValues', function ($values) {
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
    return 's-specs-values="' .
        htmlspecialchars(json_encode($values), ENT_QUOTES, 'UTF-8') .
        '"';
});
