"use strict";
var _a;
const __SSugarAppModule = require('../../app/sugar/SSugarAppModule');
const __SBuildJsInterface = require('./interface/SBuildJsInterface');
const __deepMerge = require('../../object/deepMerge');
const __SBuildJsProcess = require('./SBuildJsProcess');
/**
 * @name                SBuildJsSugarAppModule
 * @namespace           sugar.node.build.js
 * @type                Class
 * @extends             SSugarAppModule
 *
 * This class represent the build JS module for the Sugar App.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = (_a = class SBuildJsSugarAppModule extends __SSugarAppModule {
        /**
         * @name            constructor
         * @type             Function
         * @constructor
         *
         * Constructor
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        constructor(params = {}, settings = {}) {
            super(params, __deepMerge({}, settings));
        }
        /**
         * @name          start
         * @type          Function
         *
         * This method is the one called by the SugarUi main class when all is ready
         * to run the modules. Take this as your kind of "launcher" function.
         *
         * @since       2.0.0
         */
        start() {
            const pro = new __SBuildJsProcess(this.params, this._settings.processSettings);
            return super.start(pro);
        }
    },
    _a.interface = __SBuildJsInterface,
    _a);
