"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSugarAppModuleTerminalUi_1 = __importDefault(require("../../app/sugar/SSugarAppModuleTerminalUi"));
/**
 * @name            SBuildJsSugarAppTerminalUi
 * @namespace       sugar.node.build.js
 * @type            Class
 * @extends         SSugarAppModuleTerminalUi
 *
 * This class represent the display of the build js module for the terminal
 *
 * @param           {Object}            [settings={}]           An object of settings to configure your display
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SBuildJsSugarAppTerminalUi extends SSugarAppModuleTerminalUi_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since           2.0.0
     * @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(sources, settings = {}) {
        super(sources, settings);
    }
}
exports.default = SBuildJsSugarAppTerminalUi;
