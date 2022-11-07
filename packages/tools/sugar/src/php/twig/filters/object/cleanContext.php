<?php

/**
 * @name        cleanContext
 * @namespace   php.twig.filters.json
 * @type        TwigFilter
 * @status      beta
 * @platform    php
 *
 * This twig filter allows you to clean the "_context" variable to get only the values you actually passed
 *
 * @param       {String}            $context          The context value
 * @return      {String}                        The cleaned context variable
 *
 * @example       twig
 * <div data="{{ _context|cleanContext|json_encode }}"></div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('cleanContext', function ($value) {
    unset($value['frontspec']);
    unset($value['docmap']);
    unset($value['server']);
    unset($value['packageJson']);
    unset($value['config']);
    unset($value['configFiles']);
    unset($value['requestedConfig']);
    unset($value['menus']);
    unset($value['env']);
    unset($value['_sharedDataFilePath']);
    unset($value['shared']);
    unset($value['request']);

    // return implode(' - ', array_keys($value));
    return $value;
});
