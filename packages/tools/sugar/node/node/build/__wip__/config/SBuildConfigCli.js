"use strict";
// @ts-nocheck
var _a;
const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __SBuildConfigInterface = require('./interface/SBuildConfigInterface');
/**
 * @name            SBuildConfigCli
 * @namespace           sugar.node.build.config
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build JS cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildConfigCli extends __SCli {
        /**
         * @name          constructor
         * @type          Function
         * @constructor
         *
         * Constructor
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings = {}) {
            super(__deepMerge({
                id: 'build.config.cli',
                name: 'Build Config Cli'
            }, settings));
        }
    },
    /**
     * @name          command
     * @type          String
     * @static
     *
     * Store the command string
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.command = 'sugar build.config %arguments',
    /**
     * @name          interface
     * @type          Object
     * @static
     *
     * Store the definition object
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interfaces = {
        this: __SBuildConfigInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkQ29uZmlnQ2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL25vZGUvYnVpbGQvX193aXBfXy9jb25maWcvU0J1aWxkQ29uZmlnQ2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RELE1BQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFFN0U7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sQ0FBQyxPQUFPLFNBQUcsTUFBTSxlQUFnQixTQUFRLE1BQU07UUF5Qm5EOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQUN2QixLQUFLLENBQ0gsV0FBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSxrQkFBa0I7Z0JBQ3RCLElBQUksRUFBRSxrQkFBa0I7YUFDekIsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBQ0osQ0FBQztLQUNGO0lBNUNDOzs7Ozs7OztPQVFHO0lBQ0ksVUFBTyxHQUFHLCtCQUFnQztJQUVqRDs7Ozs7Ozs7T0FRRztJQUNJLGFBQVUsR0FBRztRQUNsQixJQUFJLEVBQUUsdUJBQXVCO0tBQzdCO09Bc0JILENBQUMifQ==