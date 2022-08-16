<?php

namespace thorin;

/**
 * Remove empty entries in an array
 * @param    {Array}    $array    The array to process
 * @return    {Array}    The new processed array
 *
 * @example    php
 * $newArray = Thorin::array_remove_empty(['','hello','','world']);
 * // ['hello','world']
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see
 */
function array_remove_empty($array){
	foreach($array as $k=>&$v){
        if(is_array($v)){
            $v=array_remove_empty($v);  // filter subarray and update array
            if(!sizeof($v)){ // check array count
                unset($array[$k]);
            }
        }elseif(!strlen($v)){  // this will handle (int) type values correctly
            unset($array[$k]);
        }
   }
   return $array;
}
