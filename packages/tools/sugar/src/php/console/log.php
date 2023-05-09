<?php

namespace Sugar\console;

/**
 * @name            log
 * @namespace            php.console
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function allows you to log things from php directly to the browser console
 *
 * @param       {Any}            $log           The element to log
 *
 * @snippet         \Sugar\console\log($1);
 *
 * @example         php
 * \Sugar\console\log((object) [
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function log()
{
    foreach (func_get_args() as $log) {
        $isJson = false;
        $logStr = $log;
        if (is_array($log) || is_object($log)) {
            $isJson = true;
            $logStr = json_encode(
                $log,
                JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_QUOT
            );
        }
        // remove DOCUMENT_ROOT from logs
        $logStr = str_replace($_SERVER['DOCUMENT_ROOT'] . '/', '', $logStr);
        // print the script
        if ($isJson) {
            print '<script>console.log(' . $logStr . ');</script>';
        } else {
            print '<script>console.log(`' . $logStr . '`);</script>';
        }
    }
}
