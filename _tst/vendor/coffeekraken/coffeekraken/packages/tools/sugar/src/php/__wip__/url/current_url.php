<?php

namespace thorin;

/**
 * Return the current url
 *
 * @return    {String}    The current url
 *
 * @example    php
 * Thorin::current_url();
 * // https://thorin.io/hello/world?query=string
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function current_url() {
	return \Thorin::root_url(@$_SERVER['REQUEST_URI'], true);
}
