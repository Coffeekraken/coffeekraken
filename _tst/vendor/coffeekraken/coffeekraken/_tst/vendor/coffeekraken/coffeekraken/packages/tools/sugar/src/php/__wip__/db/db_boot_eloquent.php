<?php

namespace thorin;

/**
 * Boot the eloquent framework
 * @example    php
 * Thorin::db_boot_eloquent();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function db_boot_eloquent() {
	// get the eloquent capsule to boot the framework
	\Thorin::db_eloquent_capsule();
}
