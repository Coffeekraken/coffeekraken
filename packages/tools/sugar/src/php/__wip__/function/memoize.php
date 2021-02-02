<?php

namespace thorin;

/**
 * Memoization of a function results in memory.
 * @param    {Callable}    $func    The function to memoize
 * @return    {Callable}    The memoized function
 *
 * @example    php
 * $memoizedAdd = Thorin::memoize(
 *   function ($num) {
 *     return $num + 10;
 *   }
 * );
 * $memoizedAdd(5); // 15
 * $memoizedAdd(6); // 16
 * $memoizedAdd(5); // 15 but cached
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function memoize($func) {
    return function() use ($func)
    {
        static $cache = [];

        $args = func_get_args();
        $key = md5(serialize($args));

        if ( ! isset($cache[$key])) {
            $cache[$key] = call_user_func_array($func, $args);
        }

        return $cache[$key];
    };
}
