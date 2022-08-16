<?php

/**
 * @class
 * @name 	STwig
 *
 * Facade class that provide all the utilities function through the STwig static methods
 *  *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
class STwig
{
    /**
     * @name __callStatic
     *
     * Catch static calls to redirect it to the corresponding Sugar\... function if it exist
     *
     * @param 	{String} 		$name 		The function name to call
     * @param 	{Array} 		$arguments 	The arguments passed to the static call
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    public static function __callStatic($name, $arguments)
    {
        // check if function is available in the stack
        if (is_callable("\\STwig\\$name")) {
            return call_user_func_array("STwig\\$name", $arguments);
        } else {
            throw new Exception(
                'Try to call a function "' .
                    $name .
                    '" that does not exist on "STwig"'
            );
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    public static function requireFolder($folder, $settings = [])
    {
        // loop on each "folders" and "files"
        foreach (glob($folder . '/*') as $path) {
            // do not process . and .. "folders"
            // if ($name == '.' or $name == '..') continue;

            if (str_contains($path, '__tests__')) {
                continue;
            }

            // filter excludes files/directories
            if (in_array($path, $settings['exclude'])) {
                continue;
            }

            if (is_dir($path) && $settings['recursive']) {
                STwig::requireFolder($path, $settings);
            } elseif (is_file($path)) {
                $info = pathinfo($path);
                if ($info['extension'] != 'php') {
                    return;
                }
                require_once $path;
            }
        }
    }
}
