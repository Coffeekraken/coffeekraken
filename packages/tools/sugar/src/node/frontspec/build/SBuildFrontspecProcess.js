"use strict";
var _a;
const __SBuildFrontspecActionsStream = require('./SBuildFrontspecActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SProcess = require('../../process/SProcess');
const __SBuildFrontspecInterface = require('./interface/SBuildFrontspecInterface');
/**
 * @name            SBuildFrontspecProcess
 * @namespace           sugar.node.build.frontspec
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the frontspec.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SBuildFrontspecProcess extends __SProcess {
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
                id: 'SBuildFrontspecProcess',
                name: 'Build Frontspec Process'
            }, settings));
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that execute the actual process
         *
         * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildFrontspecActionsStream``` instance
         * @return      {Süromise}                        An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            const actionStream = new __SBuildFrontspecActionsStream(settings);
            const actionStreamProcess = actionStream.start(params);
            this.bindSPromise(actionStreamProcess);
        }
    },
    _a.interface = __SBuildFrontspecInterface,
    _a);
