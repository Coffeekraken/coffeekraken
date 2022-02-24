<?php

namespace thorin;

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https =>//en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https =>//en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https =>//en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @param    {String}    $string    The string to deburr
 * @return    {String}    The deburred string
 *
 * @example    php
 * Thorin::str_deburr('déjà vue');
 * // deja vue
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/lodash-php/lodash-php/blob/master/src/String/deburr.php
 */
function str_deburr(string $string):string {
	return \_::deburr($string);
}
