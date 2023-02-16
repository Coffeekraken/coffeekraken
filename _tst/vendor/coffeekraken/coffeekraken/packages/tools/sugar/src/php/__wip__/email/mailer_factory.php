<?php

namespace thorin;

use PHPMailer\PHPMailer\PHPMailer;

/**
 * Return a mailer [PHPMailer](https://github.com/PHPMailer/PHPMailer) instance of the requested mailer registered in the `email` config file
 * @param    {String}    [$name=null]    The mailer name requested. If not passed, will take the email.default_mailer config.
 * @return    {PHPMailer\PHPMailer\PHPMailer}    A phpmailer instance to work with
 *
 * @example    php
 * $mailer = Thorin::mailer_factory('gmail');
 * $mailer->addAddress('john.doe@ecample.com', 'John Doe');
 * $mailer->isHTML(true);
 * // etc...
 * if ($mailer->send()) {
 *   // do something on success
 * } else {
 *   // do something on error
 * }
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
function mailer_factory($mailer = null) {

	// get the disk configuration
	$config = \Thorin::mailer_config($mailer);

	// handle no config
	if ( ! $config) {
		throw new \Exception('The mailer "'.$mailer.'" does not exist');
	}

	// create a new php mailer instance
	$mail = new PHPMailer();

	// driver
	switch(strtolower($config['driver'])) {
		case 'smtp':
			$mail->SMTPDebug = \Thorin::config('email.smtp_debug');
			$mail->isSMTP();
		break;
		case 'sendmail':
			$mail->isSendmail();
		break;
	}

	// setting the php mailer up with the mailer config
	if (isset($config['host'])) {
		$mail->Host = $config['host'];
	}
	if (isset($config['port'])) {
		$mail->Port = $config['port'];
	}
	if (isset($config['smtp_auth'])) {
		$mail->SMTPAuth = $config['smtp_auth'];
	}
	if (isset($config['smtp_secure'])) {
		$mail->SMTPSecure = $config['smtp_secure'];
	}
	if (isset($config['username'])) {
		$mail->Username = $config['username'];
	}
	if (isset($config['password'])) {
		$mail->Password = $config['password'];
	}
	if (isset($config['smtp_options'])) {
		$mail->SMTPOptions = $config['smtp_options'];
	}
	if (isset($config['from'])) {
		$from = explode(',', $config['from']);
	} else {
		$from = explode(',', \Thorin::config('email.from'));
	}
	if (count($from) == 2) {
		$mail->setFrom(trim($from[0]), trim($from[1]));
	}
	if (isset($config['reply'])) {
		$reply = explode(',', $config['reply']);
	} else {
		$reply = explode(',', \Thorin::config('email.reply'));
	}
	if (count($reply) == 2) {
		$mail->addReplyTo(trim($reply[0]), trim($reply[1]));
	}
	// return the new php mailer instance
	return $mail;
}
