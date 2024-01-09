<?php

namespace SViews\types;

/**
 * @name            SViewSettings
 * @namespace            php.types
 * @type            Class
 * @platform        php
 * @status          beta
 *
 * This class represent a view settings object that can be passed to the view,
 * and further to some functions like the `cls` one.
 *
 * @property      {Boolean}        clsStyle        Specify if you want to apply the style classes or not
 * 
 * @snippet         \SViews\types\SViewSettings;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SViewSettings {
    public $clsStyle = false;

    public function __construct(object $obj) {
        foreach ($obj as $key => $value) {
            $this->$key = $value;
        }
    }
}