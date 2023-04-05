<?php

namespace Sugar\is;

/**
 * @name        assocArray
 * @namespace            php.is
 * @type        Function
 * @platform        php
 * @status          beta
 *
 * Check if the passed array is associative or not
 *
 * @param       {Array}        $ar           The array to check
 * @return      {Boolean}                       true if associative, false if not
 *
 * @snippet             \Sugar\is\assoc($1);
 *
 * @example      php
 * Sugar\is\assocArray(['hello' => 'world']); // => true
 * Sugar\is\assocArray('hello', 'world'); // => false
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function assocArray($arr)
{
    if (!is_array($arr)) {
        return false;
    }

    if ([] === $arr) {
        return false;
    }
    return array_keys($arr) !== range(0, count($arr) - 1);
}
