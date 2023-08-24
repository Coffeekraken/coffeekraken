<?php

/**
 * @name            specsDataAttribute
 * @namespace            php.twig.functions.specs
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to print the `s-specs-data="{...}"` attribute only if the $_ENV['S_NODES_DATA'] is setted to true.
 *
 * @param      {String}            $data              The values to print in the attribute
 * @return      {String}                                The `s-specs-values="{...}"` attribute containing your values
 *
 * @snippet             __specsDataAttribute($1)
 *
 * @example         twig
 * <div {{ __specsDataAttribute(_context) }}>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__specsDataAttribute', function ($data) {
    // check if the $_ENV['S_NODES_DATA'] is set to true
    if (!isset($_ENV['S_NODES_DATA']) || $_ENV['S_NODES_DATA'] == false) {
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

    // return ready to attr JSON
    return 's-specs-data="' .
        htmlspecialchars(
            '{
        "source": ' .
                json_encode($source) .
                ',
        "values": ' .
                json_encode($data) .
                ',
        "specs": ' .
                json_encode($specs) .
                '
    }',
            ENT_QUOTES | JSON_FORCE_OBJECT,
            'UTF-8'
        ) .
        '"';
});
