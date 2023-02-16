<?php

namespace thorin;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
$t_db_capsule = null;
/**
 * Boot the eloquent ORM with the db.connections configurations
 * @example    php
 * Thorin::db_boot_eloquent();
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbosel.com)
 */
function db_eloquent_capsule() {
	global $t_db_capsule;
	// create the capsule first time
	if ( ! $t_db_capsule) {
		$t_db_capsule = new Capsule;
		$connections = \Thorin::config('db.connections');
		foreach($connections as $name=>$config) {
			$t_db_capsule->addConnection($config, $name);
		}
		$t_db_capsule->setEventDispatcher(new Dispatcher(new Container));
		$t_db_capsule->bootEloquent();
		$t_db_capsule->setAsGlobal();
	}
	// return the capsule
	return $t_db_capsule;
}
