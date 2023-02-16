<?php

namespace thorin;

use Respect\Validation\Validator;

/**
 * Return a [Respect Validation|(https://github.com/Respect/Validation) class instance to work with
 * @return    {Respect\Validation\Validator}    The validator class instance to work with
 *
 * @example    php
 * Thorin::validator()->alnum()->length(1,15)->validate('alganet'); // true
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://respect-validation.readthedocs.io/en/1.1/
 */
function validator() {
	return new Validator();
}
