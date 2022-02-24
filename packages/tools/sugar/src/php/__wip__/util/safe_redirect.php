<?php

namespace thorin;

/**
 * Redirect the user to a specific url. If the header redirect did not work, print a redirect in the html
 * @param    {String}    $url    The url to redirect the user to
 * @param    {Boolean}    [$exit=true]    Whether to stop the php script or not
 *
 * @example    php
 * Thorin::safe_redirect('https://google.com');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://www.jonasjohn.de/snippets/php/secure-redirect.htm
 */
function safe_redirect($url, $exit=true) {
    // Only use the header redirection if headers are not already sent
    if (!headers_sent()){
        header('HTTP/1.1 301 Moved Permanently');
        header('Location: ' . $url);
        // Optional workaround for an IE bug (thanks Olav)
        header("Connection: close");
    }

    // HTML/JS Fallback:
    // If the header redirection did not work, try to use various methods other methods
	print '<script>';
	print 'document.location = "' . $url . '";';
	print '</script>';

    // Stop the script here (optional)
    if ($exit) exit;
}
