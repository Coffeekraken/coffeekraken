"use strict";
// @ts-nocheck
var _a;
const __SCli = require('../../cli/SCli');
const __deepMerge = require('../../object/deepMerge');
const __SBuildViewsInterface = require('./interface/SBuildViewsInterface');
/**
 * @name            SBuildViewsCli
 * @namespace           sugar.node.build.views
 * @type            Class
 * @extends         SCli
 *
 * This class represent the build views cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildViewsCli extends __SCli {
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
                id: 'build.views',
                name: 'Build Views'
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
    _a.command = 'sugar build.views %arguments',
    /**
     * @name          interface
     * @type          SInterface
     * @static
     *
     * Store the definition object
     *
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _a.interfaces = {
        this: __SBuildViewsInterface
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0J1aWxkVmlld3NDbGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQnVpbGRWaWV3c0NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7QUFFZCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN6QyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN0RCxNQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRTNFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsT0FBTyxTQUFHLE1BQU0sY0FBZSxTQUFRLE1BQU07UUF5QmxEOzs7Ozs7OztXQVFHO1FBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtZQUN2QixLQUFLLENBQ0gsV0FBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSxhQUFhO2dCQUNqQixJQUFJLEVBQUUsYUFBYTthQUNwQixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFDSixDQUFDO0tBQ0Y7SUE1Q0M7Ozs7Ozs7O09BUUc7SUFDSSxVQUFPLEdBQUcsOEJBQStCO0lBRWhEOzs7Ozs7OztPQVFHO0lBQ0ksYUFBVSxHQUFHO1FBQ2xCLElBQUksRUFBRSxzQkFBc0I7S0FDNUI7T0FzQkgsQ0FBQyJ9