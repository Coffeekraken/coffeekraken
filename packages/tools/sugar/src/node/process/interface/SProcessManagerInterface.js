"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SProcessManagerInterface extends SInterface_1.default {
    },
    // static extendsArray = ['SProcess', 'SPromise'];
    _a.definition = {
        run: {
            type: 'Function',
            required: true
        },
        kill: {
            type: 'Function',
            required: true
        }
    },
    _a.title = 'SProcess elements Interface',
    _a.description = 'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit',
    _a);
//# sourceMappingURL=module.js.map