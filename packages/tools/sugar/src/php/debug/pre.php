<?php

namespace Sugar\debug;

/**
 * @name            pre
 * @namespace            php.array
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function simply print your passed "object/array" in a "<pre>" tag using the "print_r" function.
 *
 * @param       {Array}         $toPrint        The data to print
 * @return      {String}                        The printed data
 *
 * @example         php
 * print \Sugar\debug\pre([
 *    'prop1' => 'Hello',
 *    'prop2' => 'World'
 * ]);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function pre($data)
{
    ob_start();
    print_r($data);
    $str = ob_get_clean();
    return '<pre>' . $str . '</pre>';
}
