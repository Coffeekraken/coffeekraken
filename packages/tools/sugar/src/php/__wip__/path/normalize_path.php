<?php

namespace thorin;

/**
 * Return a normalized version of the passed path.
 * 1. Resolve all the ../
 * 2. Replace backslashes with forwardslashes
 * 3. Combine multiple slashes into a single slash
 * @param    {String}    $path    The path to process
 * @return    {String}    The normalized path
 *
 * @example    php
 * $path = Thorin::normalize_path('hello/world/../universe');
 * // hello/universe
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function normalize_path($path)
{
    $parts = array();// Array to build a new path from the good parts
    $path = \str_replace('\\', '/', $path);// Replace backslashes with forwardslashes
    $path = preg_replace('/\/+/', '/', $path);// Combine multiple slashes into a single slash
    $segments = explode('/', $path);// Collect path segments
    $test = '';// Initialize testing variable
    foreach($segments as $segment)
    {
        if($segment != '.')
        {
            $test = array_pop($parts);
            if(is_null($test))
                $parts[] = $segment;
            else if($segment == '..')
            {
                if($test == '..')
                    $parts[] = $test;

                if($test == '..' || $test == '')
                    $parts[] = $segment;
            }
            else
            {
                $parts[] = $test;
                $parts[] = $segment;
            }
        }
    }
    return implode('/', $parts);
}
