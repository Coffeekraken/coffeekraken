"use strict";
var _a;
const __SProcess = require('../../process/SProcess');
const __SSugarApp = require('./SSugarApp');
const __SSugarAppInterface = require('./interface/SSugarAppInterface');
/**
 * @name            SSugarAppProcess
 * @namespace           sugar.node.ui.sugar
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that expose every registered "modules"
 * through through a socket connection and handle the talk between
 * the backend parts with the frontend parts of each modules.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = (_a = class SSugarAppProcess extends __SProcess {
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
            super({
                id: 'sugar.app.process',
                name: 'Sugar App Process',
                ...settings
            });
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that execute the frontend server code, listen for errors, etc...
         *
         * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
         * @return      {Süromise}                        An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            // new sugar ui instance
            this._sugarUiInstance = new __SSugarApp({});
            this.bindSPromise(this._sugarUiInstance);
        }
    },
    _a.interface = __SSugarAppInterface,
    _a);
