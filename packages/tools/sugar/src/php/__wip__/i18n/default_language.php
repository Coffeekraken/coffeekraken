<?php

namespace thorin;

/**
 * Return the default language set in configuration
 *
 * @example    php
 * $lang = Thorin::default_language();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_language() {
	return \Thorin::config('i18n.default_language');
}
