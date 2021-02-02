<?php

namespace thorin;

/**
 * Display a recaptcha using the configured secret, sitekey, lang and attributes
 * @param    {String}    [$secret=null]    The recaptcha secret. Taken from config if null
 * @param    {String}    [$sitekey=null]    The recaptcha sitekey. Taken from config if null
 * @param    {String}    [$lang=null]    The language wanted for the recaptcha. Taken from config if null
 * @param    {Array}    [$attributes=null]    An attribute array with data-theme, data-type and data-size attibutes. Taken from config if null
 * @return    {String}    The recaptcha code to display it
 *
 * @example    php
 * print Thorin::recaptcha_display();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/ARCANEDEV/noCAPTCHA
 */
function recaptcha_display($secret = null, $sitekey = null, $lang = null, $attributes = null) {
	$nocaptcha = \Thorin::recaptcha_factory($secret, $sitekey, $lang, $attributes);
	$res = [];
	array_push($res, $nocaptcha->display());
	array_push($res, $nocaptcha->script());
	return implode("\n", $res);
}
