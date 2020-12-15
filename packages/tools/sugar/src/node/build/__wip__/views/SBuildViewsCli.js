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
    _a.interface = __SBuildViewsInterface,
    _a);
//# sourceMappingURL=SBuildViewsCli.js.map