<?php

namespace thorin;

use Arcanedev\NoCaptcha\NoCaptcha;

/**
 * Verify that the recaptcha has been checked.
 * @param    {String}    [$response=null]    The `g-recaptcha-response` string to verify. If null, take the `$_POST["g-recaptcha-response"]` default variable
 * @param    {String}    [$secret=null]    The recaptcha secret. Taken from config if null
 * @param    {String}    [$sitekey=null]    The recaptcha sitekey. Taken from config if null
 * @param    {String}    [$lang=null]    The language wanted for the recaptcha. Taken from config if null
 * @param    {Array}    [$attributes=null]    An attribute array with data-theme, data-type and data-size attibutes. Taken from config if null
 *
 * @example    php
 * if (Thorin::recaptcha_verify()) {
 *    // recaptcha verified!
 * } else {
 *    // recaptcha verification failed
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 * @see    https://github.com/ARCANEDEV/noCAPTCHA
 */
function recaptcha_verify($response = null, $secret = null, $sitekey = null, $lang = null, $attributes = null) {
	$response = $response ?: $_POST['g-recaptcha-response'];
	$recaptcha = \Thorin::recaptcha_factory($secret, $sitekey, $lang, $attributes);
	return $recaptcha->verify($response);
}
