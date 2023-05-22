<?php

namespace Sugar\fs;

/**
 * @name        traverseUp
 * @namespace            php.fs
 * @type      Function
 * @platform          php
 * @status      beta
 *
 * Go up through the filesystem from a specified folder until the closure returns truc and returns the path
 *
 * @param 		{String}                from                Specify the folder path from which to start
 * @param       {Function|null}              callback            The callback function to call on each folder path. It this returns true, the process stops and the current folder path is returned
 * @return 		{String}                                    The folder path on which the callback has returned true, or null if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         \Sugar\fs\traverseUp($1, $2)
 * \Sugar\fs\traverseUp($1, function(\$path) {
 *      $2
 * });
 *
 * @example  	php
 * const finalPath = \Sugar\fs\traverseUp('/Users/something/cool', function($path) {
 *    if (count(explode('/', $path)) <= 2) {
 *      return true;
 *    }
 * }); // '/Users/something'
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function traverseUp($from, $callback)
{
    $parts = explode('/', $from);
    while (count($parts)) {
        $path = implode('/', $parts);
        if ($callback($path)) {
            return $path;
        }
        array_pop($parts);
    }

    return null;
}
