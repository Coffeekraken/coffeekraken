<?php

namespace Sugar\html;

/**
 * @name            attrs
 * @namespace            php.html
 * @type            Function
 * @platform        twig
 * @status          beta
 *
 * This function allows you to generate an html attributes string from a key=>pair object
 *
 * @param       {Object|Array}         $attributes            An associative array of key=>value pairs attributes
 * @param       {Array}                 [$exclude=[]]           An array of attributes to exclude
 * @return      {String}                         The resulting html string
 *
 * @snippet             \Sugar\html\attrs($1);
 *
 * @example         twig
 * <div <?php print \Sugar\attrs((object) [
 *      'my-attr' => 'something'
 * ]) ?>></div>
 *
 * <div <?php print \Sugar\attrs([
 *      (object) [
 *          'name' => 'my-attr',
 *          'value' => 'something
 *      ]
 * ]) ?>></div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function attrs($attributes, $exclude = [])
{
    if (!isset($attributes)) {
        return '';
    }

    $attributes = (array) $attributes;

    // store the final attributes array
    $attrsAr = [];

    foreach ($attributes as $key => $value) {
        $attrName = $key;
        if (isset($value['name'])) {
            $attrName = $value['name'];
        }

        // handle exclude
        if (in_array($attrName, $exclude)) {
            continue;
        }

        if (isset($value['name'])) {
            array_push($attrsAr, $value['name'] . '="' . $value['value'] . '"');
        } else {
            if (is_bool($value) && $value == true) {
                array_push($attrsAr, $key);
            } else {
                array_push($attrsAr, $key . '="' . $value . '"');
            }
        }
    }

    // return the new attribute string
    return implode(' ', $attrsAr);
}
