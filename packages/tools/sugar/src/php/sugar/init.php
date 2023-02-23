<?php

namespace Sugar;

/**
 * @name            init
 * @namespace            php.sugar
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to init the sugar toolkit with ease and elegantly.
 * All this really do under the hood is to set some environment variables
 * that will be used across the toolkit, usually as function argument default values
 * or in some optional settings arguments.
 * Note that if you prefer, you can set these environment variables by hand the way
 * you prefer.
 *
 * @param       {Object}         $settings          Some settings you want to init.
 *
 * @setting         {String}        'frontend.path'         The absolute path to the frontend directory where you will find the frontspec.json file, package.json, etc...
 * @setting         {String}        'frontspec.path'        The absolute path to the frontspec.json file
 *
 * @snippet             \Sugar\init($1);
 *
 * @example         php
 * \Sugar\init([
 *    "frontend.path" => "/something/cool/..."
 * ]);
 * // This will generate this environment variable: $_ENV["S_FRONTEND_PATH"] = "/something/cool/..."
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function init($settings = [])
{
    foreach ($settings as $key => $value) {
        // build the final env key
        $finalKey = str_replace('.', '_', $key);
        $finalKey = strtoupper($finalKey);
        $finalKey = 'S_' . $finalKey;

        // set the env variable
        $_ENV[$finalKey] = $value;
    }
}
