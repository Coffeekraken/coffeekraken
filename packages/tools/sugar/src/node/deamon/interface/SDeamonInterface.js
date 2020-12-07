"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SDeamonInterface extends SInterface_1.default {
    },
    _a.extendsArray = ['SPromise'],
    _a.definition = {
        logs: {
            type: 'Object',
            required: true
        },
        watch: {
            type: 'Function',
            required: true
        },
        state: {
            type: 'String',
            required: true,
            values: ['idle', 'watching', 'error']
        }
    },
    _a);
//# sourceMappingURL=SDeamonInterface.js.map