<?php

namespace Sugar\ar;

/**
 * @name            pickRandom
 * @namespace            php.array
 * @type            Function
 * @platform        php
 * @status          beta
 * 
 * This returns you a random item of the passed array
 * 
 * @param       {Array}         $array          The array in which you want to pick a random item
 * @return      {Any}                         The random array item
 * 
 * @example         php
 * \Sugar\ar\pickRandom(['hello','world','test']);
 * 
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function pickRandom(array $array) {
    return $array[array_rand($array, 1)];
}