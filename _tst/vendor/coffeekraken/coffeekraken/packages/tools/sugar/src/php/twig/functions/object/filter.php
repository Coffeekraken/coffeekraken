<?php

namespace Sugar\object;

/**
 * @name            filter
 * @namespace       php.object
 * @type            Function
 *
 * This function allows you filter some object items either by:
 * - `^...`: The keys that starts with the passed string
 * - `...$`: The keys that ends with the passed string
 * - `function($key, $value) { retur true; }`: A function that must return true or false
 *
 * @param       {Object}        $object         The object to filter
 * @param       {String|Function}       $filter         The filter to use
 * @return      {Object}                        The filtered object
 *
 * @example         php
 * {% set obj = {
 *   hello: 'world',
 *   yop: 'plop',
 *   helloPlop: true
 * } %}
 * \Sugar\object\filter($obj, '^hel'); // (object) ["hello" => 'world', "helloPlop" => true]
 * \Sugar\object\filter($obj, function($key, $value) {
 *   return false;
 * }); // (object) []
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('filter', function ($object, $filter) {
    return (array) \Sugar\object\filter($object, $filter);
});
