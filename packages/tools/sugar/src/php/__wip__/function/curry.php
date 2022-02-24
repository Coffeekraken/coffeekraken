<?php

namespace thorin;

/**
 * Curries a function to take arguments in multiple calls.
 * @param    {Callable}    $function    Function to currie
 * @return    {Callable}    The curried function
 *
 * @example    php
 * $currieAdd = Thorin::curry(function($a, $b) {
 *    return $a + $b;
 * });
 * $currieAdd(10)(15); // 25
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/appzcoder/30-seconds-of-php-code
 */
function curry($function) {
    $accumulator = function ($arguments) use ($function, &$accumulator) {
        return function (...$args) use ($function, $arguments, $accumulator) {
            $arguments = array_merge($arguments, $args);
            $reflection = new \ReflectionFunction($function);
            $totalArguments = $reflection->getNumberOfRequiredParameters();

            if ($totalArguments <= count($arguments)) {
                return $function(...$arguments);
            }

            return $accumulator($arguments);
        };
    };

    return $accumulator([]);
}
