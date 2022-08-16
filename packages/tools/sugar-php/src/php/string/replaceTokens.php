<?php

namespace Sugar\string;

/**
 * @name            replaceTokens
 * @namespace            php.string
 * @type            Function
 * @platform        php
 * @status          beta
 * 
 * This function take care of replacing some tokens like "%serverIp", "%clientIp", etc...
 * Here's the list of supported tokens: (this list can be updated with new tokens)
 * - %serverIp: Server ip address
 * - %clientIp: Client ip address
 * 
 * @param       {String}        $string         The string to process
 * @return      {String}                        The processed string
 * 
 * @example         php
 * Sugar\string\replaceTokens('Hello %serverIp, how are you?'); // => Hello 156.436.56.75, how are you?
 * 
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

function replaceTokens($string) {
    $tokens = [
        'localIp' => \Sugar\network\ipAddress('local'),
        'externalIp' => \Sugar\network\ipAddress('external')
    ];
    foreach ($tokens AS $key => $value)
    {
        $string = str_replace('%' . $key, $value, $string);
    }
    return $string;
}