"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSugarAppModule_1 = __importDefault(require("../../app/sugar/SSugarAppModule"));
const SFrontendServerInterface_1 = __importDefault(require("./interface/SFrontendServerInterface"));
const deepMerge_1 = __importDefault(require("../../object/deepMerge"));
const SFrontendServerProcess_1 = __importDefault(require("../../server/frontend/SFrontendServerProcess"));
/**
 * @name                SFrontendServerSugarAppModule
 * @namespace           sugar.node.server.frontend
 * @type                Class
 * @extends             SSugarAppModule
 *
 * This class represent the frontend server module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
class SFrontendServerSugarAppModule extends SSugarAppModule_1.default {
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
        super(params, deepMerge_1.default({
            autoRun: true
        }, settings));
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
        const pro = new SFrontendServerProcess_1.default({
            runAsChild: true,
            ...this._settings.processSettings
        });
        return super.start(pro);
    }
}
exports.default = SFrontendServerSugarAppModule;
SFrontendServerSugarAppModule.interface = SFrontendServerInterface_1.default;
