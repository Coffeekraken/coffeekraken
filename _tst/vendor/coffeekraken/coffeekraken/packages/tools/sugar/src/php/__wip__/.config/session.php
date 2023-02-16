<?php

return [
	/**
	 * @name    name
	 * Specify the session name to use for this app
	 * @type    {String}
	 * @default    thorin-app
	 */
	'name' => Thorin::env('SESSION_NAME', 'thorin-app')
];
