<?php

namespace Sugar\css;

/**
 * @name            containerClasses
 * @namespace            php.css
 * @type            Function
 * @platform        php
 * @status          beta
 *
 * This function will simply return the "s-container" adapted class. If the type is "default", the class will be "s-container",
 * but if the type is "wide", the class will be "s-container-wide".
 * You can also pass an array/object with the property "value"
 *
 * @param       {String|Array/Object}            [type="default"]            The container type you want the class for
 * @return      {String}                         The resulting css classes
 *
 * @snippet         \Sugar\css\containerClasses($1);
 *
 * @example         php
 * \Sugar\css\containerClasses('wide');
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function containerClasses($type)
{
    if (is_array($type)) {
        $type = $type['value'];
    } elseif (is_object($type)) {
        $type = $type->value;
    } elseif ($type == null) {
        $type = 'default';
    }

    if ($type == 'default') {
        return 's-container';
    }
    return 's-container-' . $type;
}
