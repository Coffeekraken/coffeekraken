<?php

return [
	/**
	 * @name    secret
	 * The recaptcha secret
	 * @type    {String}
	 */
	'secret' => Thorin::env('RECAPTCHA_SECRET', 'secret'),

	/**
	 * @name    sitekey
	 * The recaptcha sitekey
	 * @type    {String}
	 */
	'sitekey' => Thorin::env('RECAPTCHA_SITEKEY', 'sitekey'),

	/**
	 * @name    lang
	 * The recaptcha lang to use
	 * @type    {String}
	 */
	'lang' => Thorin::env('RECAPTCHA_LANG', Thorin::language()),

	/**
	 * @name    attributes
	 * The recaptcha attributes used to display the recaptcha
	 * @type    {Array}
	 */
	'attributes' => [
		/**
		 * @name    attributes.data-theme
		 * The theme to use. Can be `dark` or `light`
		 * @type    {String}
		 * @default    light
		 */
		'data-theme' => Thorin::env('RECAPTCHA_THEME', 'light'),

		/**
		 * @name    attributes.data-type
		 * The type of captcha to use. Can be `image` or `audio`
		 * @type    {String}
		 * @default    image
		 */
		'data-type' => Thorin::env('RECAPTCHA_TYPE', 'image'),

		/**
		 * @name    attributes.data-size
		 * The size of captcha to use. Can be `normal` or `compact`
		 * @type    {String}
		 * @default    normal
		 */
		'data-size' => Thorin::env('RECAPTCHA_SIZE', 'normal')
	]
];
