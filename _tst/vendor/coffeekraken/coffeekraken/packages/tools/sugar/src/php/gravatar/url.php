<?php


namespace Sugar\gravatar;

/**
 * @name            url
 * @namespace            php.gravatar
 * @type            Function
 * @platform        php
 * @status          beta
 * 
 * This function returns the gravatar url for a given email address.
 * 
 * @param       {String}        $email       The email address to get the gravatar url for.
 * @param       {String}        $s              Size in pixels, defaults to 80px [ 1 - 2048 ]
 * @param       {String}        $d             Default imageset to use [ 404 | mp | identicon | monsterid | wavatar ]
 * @param       {String}        $r          Maximum rating (inclusive) [ g | pg | r | x ]
 * @param       {Boolean}       $img            True to return a complete IMG tag False for just the URL
 * @param       {array}         $atts           Optional, additional key/value attributes to include in the IMG tag
 * @return      {String}                    Containing either just a URL or a complete image tag
 * 
 * @example         php
 * \Sugar\gravatar\url('olivier.bossel@gmail.com');
 * 
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function url( $email, $s = 80, $d = 'mp', $r = 'g', $img = false, $atts = array() ) {
    $url = 'https://www.gravatar.com/avatar/';
    $url .= md5( strtolower( trim( $email ) ) );
    $url .= "?s=$s&d=$d&r=$r";
    if ( $img ) {
        $url = '<img src="' . $url . '"';
        foreach ( $atts as $key => $val )
            $url .= ' ' . $key . '="' . $val . '"';
        $url .= ' />';
    }
    return $url;
}