<?php

namespace thorin;

use Asika\Autolink\Autolink;
/**
 * Automaticaly transform urls into links in the passed text.
 * @param    {String}    $text    The text to process
 * @param    {Array}    [$options=[]]    The option to pass to the [Autolink](https://packagist.org/packages/asika/autolink) class
 * @return    {String}    The processed text
 *
 * @example    php
 * $text = 'Hello world this is a nice http://google.com sample of text.';
 * $newText = Thorin::str_autolink($text);
 * // Hello world this is a nice <a href="http://google.com">http://google.com</a> sample of text.
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function str_autolink($text, $options = []) {
	$options = \Thorin::extend([
		'strip_scheme' => false,
		'text_limit' => false,
		'auto_title' => false
	], $options);
	// schemas supported
	$schemes = ['http','https','tel','skype','itunes','maps','fb','twitter','ftp','sftp','ssh'];
	// create a new instance of autolink
	$al = new Autolink($options, $schemes);
	// convert links
	$newText = $al->convert($text);
	// convert mailto
	$newText = $al->convertEmail($newText);
	// return the result
	return $newText;
}
