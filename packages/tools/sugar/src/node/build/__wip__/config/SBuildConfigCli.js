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
    _a.interface = __SBuildConfigInterface,
    _a);
//# sourceMappingURL=SBuildConfigCli.js.map