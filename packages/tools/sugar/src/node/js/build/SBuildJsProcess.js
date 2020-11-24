"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SBuildJsActionsStream_1 = __importDefault(require("./SBuildJsActionsStream"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SProcess_1 = __importDefault(require("../../process/SProcess"));
const SBuildJsInterface_1 = __importDefault(require("./interface/SBuildJsInterface"));
module.exports = (_a = class SBuildJsProcess extends SProcess_1.default {
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
            super(deepMerge_1.default({
                id: 'SBuildJsProcess',
                name: 'Build JS Process'
            }, settings));
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that actually execute the process
         *
         * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
         * @return      {Süromise}                        An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            setTimeout(() => {
                const actionStream = new SBuildJsActionsStream_1.default(Object.assign(Object.assign({}, settings), { logs: {
                        success: false,
                        start: false
                    } }));
                this._buildJsActionStream = actionStream.start(params);
                this.bindSPromise(this._buildJsActionStream);
            }, 1000);
        }
    },
    _a.interface = SBuildJsInterface_1.default,
    _a);
