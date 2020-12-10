"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SSugarAppModule_1 = __importDefault(require("../../app/sugar/SSugarAppModule"));
const SBuildJsInterface_1 = __importDefault(require("./interface/SBuildJsInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SBuildJsProcess_1 = __importDefault(require("./SBuildJsProcess"));
module.exports = (_a = class SBuildJsSugarAppModule extends SSugarAppModule_1.default {
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
            super(params, deepMerge_1.default({}, settings));
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
            const pro = new SBuildJsProcess_1.default(this.params, this._settings.processSettings);
            return super.start(pro);
        }
    },
    _a.interface = SBuildJsInterface_1.default,
    _a);
//# sourceMappingURL=module.js.map