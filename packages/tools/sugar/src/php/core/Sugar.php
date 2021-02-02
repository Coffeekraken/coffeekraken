<?php
/**
 * @class
 * @name 	Sugar
 * Facade class that provide all the utilities function through the Sugar static methods
 * @example 	php
 * print Sugar::render_blade('my-cool-view', (object) []);
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
class Sugar {

	/**
	 * Catch static calls to redirect it to the corresponding Sugar\... function if it exist
	 * @name __callStatic
	 * @param 	{String} 		$name 		The function name to call
	 * @param 	{Array} 		$arguments 	The arguments passed to the static call
	 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
	 */
	public static function __callStatic($name, $arguments)
	{
		// check if function is available in the stack
		if (is_callable("\\Sugar\\$name")) {
			return call_user_func_array("Sugar\\$name", $arguments);
		} else {
			throw new Exception('Try to call a function "'.$name.'" that does not exist on "Sugar"');
		}
	}

	/**
	 * @name 			requireFolder
	 * @type 			Function
	 * @static
	 * 
	 * This static function allows you to require (recursively if wanted), all
	 * the php files inside a folder
	 * 
	 * @since 			2.0.0
 	 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
	 */
	public static function requireFolder($folder, $settings = []) {
		// generate settings
		$settings = array_merge_recursive([
			'recursive' => false,
			'exclude' => []
		], $settings);
	
		// loop on each "folders" and "files"
		foreach (scandir($folder) as $name) {

			// do not process . and .. "folders"
			if ($name == '.' or $name == '..') continue;

			// create the path
			$path = $folder . '/' . $name;

			// filter excludes files/directories
			if (in_array($path, $settings['exclude'])) continue;

			if (is_dir($path) && $settings['recursive'] == true) {
				Sugar::requireFolder($path);
			} else if (is_file($path)) {
				$info = pathinfo($path);
				if ($info['extension'] != 'php') return;
				require_once $path;
			}
		}
	}

}
