<?php

namespace Sugar\network;

/**
 * @name            ipAddress
 * @namespace            php.network
 * @type            Function
 * @platform        php
 * @status          beta
 * 
 * This function allows you to get either your "local" ip in the local network, either
 * your public ip address on the internet.
 * 
 * @param       {"local"|"external"}        [$type="local"]         Specify which ip address you want
 * @return      {String}                                            Your local or external ip address
 * 
 * @example         php
 * Sugar\network\ipAddress(); // => 192.168.1.23
 * Sugar\network\ipAddress('external'); // => 23.45.322.67
 * 
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function ipAddress($type = 'local') {
    if ($type == 'local') {
        $sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
        socket_connect($sock, "8.8.8.8", 53);
        socket_getsockname($sock, $name); // $name passed by reference
        return $name;
    } else {
        // Primary IP checker query.
        $ip = trim( file_get_contents('https://checkip.amazonaws.com') );
        if ( (filter_var($ip, FILTER_VALIDATE_IP) !== false) ) {
            return $ip;
        }
        // Secondary IP checker query.
        $ip_json = trim( file_get_contents('https://ipinfo.io') );
        $ip_arr = json_decode($ip_json,true);
        $ip=$ip_arr['ip'];
        if ( (filter_var($ip, FILTER_VALIDATE_IP) !== false) ) {
            return $ip;
        }
        return false; // Something went terribly wrong.
    }
}