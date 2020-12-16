"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SSugarAppModule_1 = __importDefault(require("./SSugarAppModule"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
module.exports = class SSugarAppProcessModule extends SSugarAppModule_1.default {
    // static interface = __SFrontendServerInterface;
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
        // check the settings interface
        super(params, deepMerge_1.default(settings));
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method is the one called by the SugarUi main class when all is ready
     * to start the modules. Take this as your kind of "launcher" function.
     *
     * @since       2.0.0
     */
    start() {
        const ProcessClass = require(this.params.processPath);
        const pro = new ProcessClass(Object.assign({}, this._settings.processSettings));
        return super.start(pro);
    }
};
//# sourceMappingURL=SSugarAppProcessModule.js.map