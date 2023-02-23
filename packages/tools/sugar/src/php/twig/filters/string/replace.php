<?php

/**
 * @name        replace
 * @namespace   php.twig.filters.string
 * @type        TwigFunction
 * @platform    twig
 * @status      beta
 *
 * This twig function allows you to replace a value by another in your string.
 * It support for regex as the search
 *
 * @param       {String}            $search         The string to replace. Can be a regex
 * @param       {String}            $replaceBy      The string to replace your $search with
 * @return      {String}                        The new string
 *
 * @snippet             __replace($1, $2)
 *
 * @example       twig
 * {{ 'hello world'|__replace('world', 'coco') }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFilter('__replace', function (
    string $string,
    string $search,
    string $replaceBy
): string {
    // handle regex
    if (preg_match("/^\/.+\/[a-z]*$/i", $search)) {
        return preg_replace($search, $replaceBy, $string);
    }

    // normal replace
    return str_replace($search, $replaceBy, $string);
});
