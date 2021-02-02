<?php

namespace thorin;

/**
 * Generate an array by repeating call to a function which return the array item to populate.
 * 
 * @param    {Function}    $fn    The function that return the array item to populate
 * @param    {Integer}    $number    How many items wanted in the generated array
 * @return    {Array}    The generated array
 * 
 * @example    php
 * $array = Thorin::array_generate_by_repeat(function($i) {
 *     return $i . '-item';
 * }, 3);
 * // ['0-item','1-item','2-item']
 * 
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function array_generate_by_repeat($fn, $number) {
  $ar = [];
  for ($i = 0; $i < $number; $i++) {
    array_push($ar, call_user_func($fn, $i));
  }
  return $ar;
}