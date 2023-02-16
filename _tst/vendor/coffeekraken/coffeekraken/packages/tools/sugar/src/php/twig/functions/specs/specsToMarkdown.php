<?php

/**
 * @name        specsToMarkdown
 * @namespace   php.twig.functions.specs
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This function allows display a spec in the markdown with all the available informations available in the passed spec json
 *
 * @param       {String[]}          $specs                  The specs you want to display
 * @return      {String}                                    The markdown list string
 *
 * @example       twig
 * {{ specsToMarkdown(mySpecs) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('specsToMarkdown', function (
    $specs,
    $details = []
) {
    $res = \Sugar\specs\specsToMarkdown($specs, $details);
    return $res;
});
