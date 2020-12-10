"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const SSugarAppModuleTerminalUi_1 = __importDefault(require("../../app/sugar/SSugarAppModuleTerminalUi"));
module.exports = class SBuildFrontspecSugarAppTerminalUi extends SSugarAppModuleTerminalUi_1.default {
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
};
//# sourceMappingURL=module.js.map