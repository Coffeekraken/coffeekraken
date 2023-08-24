<?php

/**
 * @name        markdownSpecsList
 * @namespace   php.twig.functions.specs
 * @type        Function
 * @platform    twig
 * @status      beta
 *
 * This function allows you to display a markdown specs list with some default specifications info like "margin", "padding", "gap", etc...
 * You can abviously override the defaults with your own details object that MUST contains an "title" and "description" property for each spec
 *
 * @param       {String[]}          $specs                  The list of specs you want to display
 * @param       {Object}            [$details=[]]           An associative array or an object that specify each specs details like `{margin:{title:'Margin',description':'Manage margins'}}`
 * @return      {String}                                    The markdown list string
 *
 * @snippet             __markdownSpecsList($1, $2)
 *
 * @example       twig
 * {{ __markdownSpecsList(['margin','padding'], {
 *      margin: {
 *          title: 'Margin',
 *          description: 'Manage the margins with ease
 *      }
 * }) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__markdownSpecsList', function (
    array $specs,
    $details = []
) {
    return \Sugar\specs\markdownSpecsList($specs, $details);
});
