<?php

namespace Thorin;

/**
 * Basic singleton class that expose a `getInstance` static method to
 * retreive the singleton instance of the class.
 * Support arguments if needed.
 *
 * @example    php
 * // without attributes
 * class MySingletonClass extends \Thorin\Singleton {
 * }
 * $myInstance = MySingletonClass::getInstance();
 *
 * // with arguments
 * class MySingletonClassWithArgs extends \Thorin\Singleton {
 *     public function __construct($myArg) {
 *         // do something with $myArg
 *     }
 * }
 * $myInstance = MySingletonClassWithArgs::getInstance('hello');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class Singleton
{
	/**
	 * Store the instance of the class
	 * @type    {Mixed}
	 */
    protected static $instance = null;

	/**
	 * Singleton class constructor
	 *
	 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
	 */
    protected function __construct() {
    }

	/**
	 * Get the singleton instance of the class
	 * @param    {Mixed}    $args...    Some arguments that will be passed to the constructor
	 *
	 * @example    php
	 * // without attributes
	 * $myInstance = MySingletonClass::getInstance();
	 *
	 * // with arguments
	 * $myInstance = MySingletonClassWithArgs::getInstance('hello');
	 *
	 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
	 */
    public static function getInstance() {
        if (!isset(static::$instance)) {
			$args = func_get_args();
			$cls = static::class;
			$r = new \ReflectionClass($cls);
			static::$instance = $r->newInstanceArgs($args);
        }
        return static::$instance;
    }
}
