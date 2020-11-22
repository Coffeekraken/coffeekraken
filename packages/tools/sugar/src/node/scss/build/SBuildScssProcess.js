"use strict";
var _a;
const __SBuildScssActionsStream = require('./SBuildScssActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SProcess = require('../../process/SProcess');
const __SBuildScssInterface = require('./interface/SBuildScssInterface');
/**
 * @name            SBuildScssProcess
 * @namespace           sugar.node.build.scss
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the SCSS files into CSS
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildScssProcess extends __SProcess {
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
                id: 'SBuildScssProcess',
                name: 'Build SCSS Process'
            }, settings));
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that execute the actual process code
         *
         * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
         * @return      {Süromise}                        An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            const actionStream = new __SBuildScssActionsStream({
                ...settings,
                logs: {
                    start: false,
                    success: false
                }
            });
            const actionStreamProcess = actionStream.start(params);
            this.bindSPromise(actionStreamProcess);
        }
    },
    _a.interface = __SBuildScssInterface,
    _a);
