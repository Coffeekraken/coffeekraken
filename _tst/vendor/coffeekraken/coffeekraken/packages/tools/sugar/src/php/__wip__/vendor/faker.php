<?php

namespace thorin;

$t_faker = null;
/**
 * Return an instance of faker with the one
 * you can call all the faker methods
 * @return    {Faker}    A faker instance
 *
 * @example    php
 * $faker = Thorin::faker()
 * // use faker here...
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function faker() {
	global $t_faker;
	if ($t_faker == null) {
		$t_faker = \Faker\Factory::create();
	}
	return $t_faker;
}
