<?php

namespace thorin;

use Arcanedev\NoCaptcha\NoCaptcha;
/**
 * Create a Arcanedev\NoCaptcha\NoCaptcha nocaptcha instance to work with.
 * @param    {String}    [$secret=null]    The recaptcha secret. Taken from config if null
 * @param    {String}    [$sitekey=null]    The recaptcha sitekey. Taken from config if null
 * @param    {String}    [$lang=null]    The language wanted for the recaptcha. Taken from config if null
 * @param    {Array}    [$attributes=null]    An attribute array with data-theme, data-type and data-size attibutes. Taken from config if null
 * @return    {Arcanedev\NoCaptcha\NoCaptcha}    A nocaptcha instance to work with
 *
 * @example    php
 * $recaptcha = Thorin::recaptcha_factory();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    https://github.com/ARCANEDEV/noCAPTCHA
 */
function recaptcha_factory($secret = null, $sitekey = null, $lang = null, $attributes = []) {
	$secret = $secret ?: \Thorin::config('recaptcha.secret');
	$sitekey = $sitekey ?: \Thorin::config('recaptcha.sitekey');
	$lang = $lang ?: \Thorin::config('recaptcha.lang');
	$attributes = $attributes ?: \Thorin::config('recaptcha.attributes');
	return new NoCaptcha($secret, $sitekey, $lang, $attributes);
}
