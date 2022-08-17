<?php

namespace thorin;

/**
 * Escape the passed string to ensure it will not break any html when printed inside an attribute
 *
 * @param       {String}        $string         The string to process
 * @return      {String}                        The safe string to put inside any html attribute
 *
 * @example    php
 * Thorin::str_escape_attr('This is my cool "escaped" value');
 * // This is my cool &quot;escaped&quot; value
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
function str_escape_attr($string) {
    return \htmlspecialchars($string, ENT_QUOTES);
}
