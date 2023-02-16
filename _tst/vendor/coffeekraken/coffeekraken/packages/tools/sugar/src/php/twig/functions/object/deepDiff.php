<?php

namespace Sugar\object;

/**
 * @name            deepDiff
 * @namespace            twig.object
 * @type            TwigFunction
 * @platform        php
 * @status          beta
 *
 * This function take two objects and return only what is different from one to the other
 *
 * @param       {Object}         $object1         The base object on which to deepDiff the second
 * @param       {Object}         $object2         The object you want to deepDiff the first one
 * @return      {Object}                         The object with all the differences
 *
 * @example         twig
 * {{ deepDiff({
 *    prop1: 'Hello',
 *    prop2: 'World'
 * }, {
 *    prop1: 'Plop'
 *    prop2: 'World'
 * }) }}
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
return new \Twig\TwigFunction('deepDiff', function ($object1, $object2) {

    $object1 = \Sugar\convert\toObject($object1);
    $object2 = \Sugar\convert\toObject($object2);

    return \Sugar\object\deepDiff($object1, $object2);
});