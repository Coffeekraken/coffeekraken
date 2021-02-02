<?php

namespace thorin;

use duncan3dc\Sessions\Session;

/**
 * Return the session id of the current session
 * @return    {String}    The session id of the current session
 *
 * @example    php
 * $sessionId = Thorin::session_id();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function session_id() {
	$instance = Session::getInstance();
	return $instance->getId();
}
