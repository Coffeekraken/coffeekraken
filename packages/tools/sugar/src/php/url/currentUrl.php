<?php

namespace Sugar\url;

/**
 * @name            currentUrl
 * @namespace       php.url
 * @type            Function
 * @platform        php
 * @status          beta
 * 
 * Return the current url
 *
 * @return    {String}    The current url
 *
 * @example    php
 * \Sugar\url\currentUrl();
 * // https://coffeekraken.io/hello/world?query=string
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function currentUrl() {
	return (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}
