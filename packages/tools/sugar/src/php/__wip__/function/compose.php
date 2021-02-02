<?php

namespace thorin;

/**
 * Return a new function that composes multiple functions into a single callable.
 * @param    {Callable}    ...$functions    The functions to compose
 * @return    {Callable}    A function that rule them all
 *
 * @example    php
 * $composed = Thorin::compose(function($x) {
 *   return $x + 1;
 * }, function($y) {
 *   return $y + 10
 * });
 * $composed(2); // 13
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function compose(...$functions) {
    return \array_reduce(
        $functions,
        function ($carry, $function) {
            return function ($x) use ($carry, $function) {
                return $function($carry($x));
            };
        },
        function ($x) {
            return $x;
        }
    );
}
