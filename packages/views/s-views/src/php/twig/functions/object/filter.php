<?php

namespace Sugar\object;

/**
 * @name            filter
 * @namespace       php.twig.object
 * @type            TwigFunction
 * @platform        twig
 * @status          beta
 *
 * This function allows you filter some object items either by:
 * - `^...`: The keys that starts with the passed string
 * - `...$`: The keys that ends with the passed string
 *
 * @param       {Object}        $object         The object to filter
 * @param       {String}       $filter         The filter to use
 * @return      {Object}                        The filtered object
 *
 * @snippet             __filter($1, $2)
 * 
 * @example         php
 * {% set obj = {
 *   hello: 'world',
 *   yop: 'plop',
 *   helloPlop: true
 * } %}
 * __filter($obj, '^hel'); // (object) ["hello" => 'world', "helloPlop" => true]

 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('__filter', function ($object, $filter) {
    return (array) \Sugar\object\filter($object, $filter);
});
