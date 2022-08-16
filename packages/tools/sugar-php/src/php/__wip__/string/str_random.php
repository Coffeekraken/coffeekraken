<?php

namespace thorin;

/**
 * Function which generate random string
 *
 * @param       {Int}        $length         Lenght of generate string
 * @return      {String}                     The string generated
 *
 * @example    php
 * Thorin::str_random(10);
 * // fjeik9eud8
 *
 * @author 		Paul Balanche <pb@buzzbrothers.ch>
 */
function str_random($length = 10) {
	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for($i = 0; $i < $length; $i++) {
        $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
