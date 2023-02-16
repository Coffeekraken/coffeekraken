<?php

namespace Sugar\object;

/**
 * @name            get
 * @namespace       php.twig.functions.object
 * @type            Function
 *
 * This function allows you to get a value from the passed object using the passed dotpath
 *
 * @param       {Object}        $object         The object from which to get the value
 * @param       {String}        $dotpath        The dotpath to get in the object
 * @param       {String}        [$separator='.']        The dotpath separator
 * @return      {Any}                           The getted value
 *
 * @example         twig
 * {% set obj = {
 *   hello: {
 *      world : "plop"
 *   }
 * } %}
 * {{ get(obj, 'hello.world') }}
 *
 * @since       2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('get', function (
    $object,
    $dotpath,
    $separator = '.'
) {
    return \Sugar\object\get($object, $dotpath, $separator);
});
