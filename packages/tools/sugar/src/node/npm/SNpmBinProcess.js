"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SProcess_1 = __importDefault(require("../process/SProcess"));
const SNpmBinInterface_1 = __importDefault(require("./interface/SNpmBinInterface"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
module.exports = (_a = class SNpmBinProcess extends SProcess_1.default {
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
                id: 'SNpmBinProcess',
                name: 'Npm Bin Process'
            }, settings));
        }
        /**
         * @name              process
         * @type              Function
         *
         * Method that actually execute the process
         *
         * @param       {Object}       params           The arguments object that will be passed to the underlined actions stream instance
         * @param       {Object}       [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
         * @return      {Süromise}                       An SPomise instance representing the build process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        process(params, settings = {}) {
            setTimeout(() => {
                const actionStream = new __SBuildJsActionsStream(Object.assign(Object.assign({}, settings), { logs: {
                        success: false,
                        start: false
                    } }));
                this._buildJsActionStream = actionStream.start(params);
                this.bindSPromise(this._buildJsActionStream);
            }, 1000);
        }
    },
    _a.interface = SNpmBinInterface_1.default,
    _a);
//# sourceMappingURL=SNpmBinProcess.js.map