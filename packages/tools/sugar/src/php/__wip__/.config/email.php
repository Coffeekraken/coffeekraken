<?php

return [

	/**
	 * @name    default_mailer
	 * Set the default mailer to use if none is passed to the `t_mailer` function
	 * @type    {String}
	 * @default    mail
	 */
	'default_mailer' => Thorin::env('EMAIL_DEFAULT_MAILER', 'mail'),

	/**
	 * @name    from
	 * Specify the from address to use if none is specified at mailer level
	 * @type    {String}
	 * @default    Thorin::env('EMAIL_FROM', 'postmaster@${app.domain},${app.name}')
	 */
	'from' => Thorin::env('EMAIL_FROM', 'postmaster@${app.domain},${app.name}'),

	/**
	 * @name    reply
	 * Specify the reply address to use if none is specified at mailer level
	 * @type    {String}
	 * @default    Thorin::env('EMAIL_REPLY', 'no-reply@${app.domain},No reply')
	 */
	'reply' => Thorin::env('EMAIL_REPLY', 'no-reply@${app.domain},No reply'),

	/**
	 * @name    smtp_debug
	 * Specify the debug level to set to phpmailer SMTPDebug property.
	 * Can be:
	 * 0: no debug at all
	 * 1: Output messages sent by the client
	 * 2: as 1, plus responses received from the server (this is the most useful setting).
	 * @type    {Integer}
	 * @default   0
	 */
	'smtp_debug' => Thorin::env('EMAIL_SMTP_DEBUG', 0),

	/**
	 * @name    mailers
	 * Register some mailers to be used by the `t_mailer` function.
	 * @type    {Array}
	 */
	'mailers' => [
		/**
		 * @name    gmail
		 * Gmail mailer
		 * @type    {Array}
		 */
		'gmail' => [
			'driver' => 'smtp',
			'host' => Thorin::env('GMAIL_HOST', 'smtp.gmail.com'),
			'port' => Thorin::env('GMAIL_PORT', 587),
			'smtp_secure' => Thorin::env('GMAIL_SMTP_SECURE', 'tls'),
			'smtp_auth' => Thorin::env('GMAIL_SMTP_AUTH', true),
			'username' => Thorin::env('GMAIL_USERNAME', 'username@gmail.com'),
			'password' => Thorin::env('GMAIL_PASSWORD', 'yourpassword'),
			// 'smtp_options' => [],
			// 'from' => Thorin::env('GMAIL_FROM', 'postmaster@${app.domain},${app.name}'),
			// 'reply' => Thorin::env('GMAIL_REPLY', 'no-reply@${app.domain},No reply')
		],
		/**
		 * @name    mailgun
		 * Mailgun mailer
		 * @type    {Array}
		 */
		'mailgun' => [
			'driver' => 'smtp',
			'host' => Thorin::env('MAILGUN_HOST', 'smtp.mailgun.org'),
			'port' => Thorin::env('MAILGUN_PORT', 587),
			'smtp_secure' => Thorin::env('MAILGUN_SMTP_SECURE', 'tls'),
			'smtp_auth' => Thorin::env('MAILGUN_SMTP_AUTH', true),
			'username' => Thorin::env('MAILGUN_USERNAME', 'username@yourdomain.com'),
			'password' => Thorin::env('MAILGUN_PASSWORD', 'yourpassword'),
			// 'smtp_options' => [],
			// 'from' => Thorin::env('MAILGUN_FROM', 'postmaster@${app.domain},${app.name}'),
			// 'reply' => Thorin::env('MAILGUN_REPLY', 'no-reply@${app.domain},No reply')
		],
		/**
		 * @name    mail
		 * PHP mail mailer
		 * @type    {Array}
		 */
		'mail' => [
			'driver' => 'mail',
			// 'from' => Thorin::env('MAIL_FROM', 'postmaster@${app.domain},${app.name}'),
			// 'reply' => Thorin::env('MAIL_REPLY', 'no-reply@${app.domain},No reply')
		],
		/**
		 * @name    sendmail
		 * Sendmail mailer
		 * @type    {Array}
		 */
		'sendmail' => [
			'driver' => 'sendmail',
			// 'from' => Thorin::env('SENDMAIL_FROM', 'postmaster@${app.domain},${app.name}'),
			// 'reply' => Thorin::env('SENDMAIL_REPLY', 'no-reply@${app.domain},No reply')
		]
	]
];
