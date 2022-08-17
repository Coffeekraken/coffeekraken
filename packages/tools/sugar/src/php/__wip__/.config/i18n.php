<?php

return [
	/**
	 * @name		AVAILABLE_LANGUAGES
	 * Specify the available languages in two characters format like "fr, en, etc..."
	 * Need to be an array of two characters language code
	 * @type 		{Array}
	 * @default 	['en']
	 */
	'available_languages' => Thorin::env('AVAILABLE_LANGUAGES', ['en']),

	/**
	 * @name 		DEFAULT_LANGUAGE
	 * Specify the default language in two characters format like "fr, en, etc..."
	 * Need to be a two characters language code
	 * @type 		{String}
	 * @default 	en
	 */
	'default_language' => Thorin::env('DEFAULT_LANGUAGE', 'en')
];
