<?php

namespace Sugar\object;

/**
 * @name            firstItem
 * @namespace            php.object
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to get back the first item value of an object
 *
 * @param       {Array|Object}      $object         The object to get value from
 * @return      {Any}                               The first object value
 *
 * @snippet     \Sugar\object\firstItem($1);
 *
 * @example         php
 * \Sugar\object\firstItem((object) [
 *  'hello' => 'world',
 *  'something' => 'cool'
 * ]); // world
 *
 * @see             https://developer.wordpress.org/reference/functions/deepMap/
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function firstItem($object)
{
    $key = array_key_first((array) $object);
    return $object->$key;
}
