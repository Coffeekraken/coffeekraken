<?php

namespace thorin;

use League\Event\Emitter;
$t_emitters = [];
/**
 * Return a [League\Event\Emitter](http://event.thephpleague.com/2.0/emitter/basic-usage/) instance to work with.
 * @param    {String}    [$name="default"]    The name of the emitter to create if want to separate them
 * @return    {League\Event\Emitter}    The League\Event\Emitter instance to work with
 *
 * @example    php
 * $emitter = Thorin::emitter();
 * $emitter->addListener('event.name', function($event) {
 *   // do something here...
 * });
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 * @see    http://event.thephpleague.com/2.0/emitter/basic-usage/
 */
function emitter($name = 'default') {
	global $t_emitters;
	if (isset($t_emitters[$name])) {
		return $t_emitters[$name];
	}
	$emitter = new Emitter;
	$t_emitters[$name] = $emitter;
	return $emitter;
}
