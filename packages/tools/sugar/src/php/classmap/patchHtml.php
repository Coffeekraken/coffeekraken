<?php

namespace Sugar\classname;

/**
 * @name        patchHtml
 * @namespace   php.classname
 * @type        Function
 * @status      beta
 * @platform    php
 *
 * This method allows you to patch some html classes/variables depending on the classmap.json file loaded through the SClassmap class
 * that is exposed in the @coffeekraken/s-classname package.
 *
 * @param       {String}            $html           The html to patch
 * @param       {Object}            $settings       Some settings to pass to the SClassmap class
 * @return      {String}                            The patched html
 *
 * @snippet         \Sugar\classmap\patchHtml($1);
 *
 * @example       php
 * $patchedHtml = \Sugar\classmap\patchHtml('...');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function patchHtml(string $html, $settings = [])
{
    $classmap = new \SClassmap($settings);
    return $classmap->patchHtml($html);
}
