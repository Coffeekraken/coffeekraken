"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SProcessDeamonSettingInterface extends SInterface_1.default {
    },
    _a.definition = {
        class: {
            type: 'Class',
            required: true,
            description: 'The SDeamon based class to use'
        },
        watchArgs: {
            type: 'Array',
            required: true,
            description: 'An array of arguments that will be passed to the "watch" method of the deamon'
        },
        processParams: {
            type: 'Function',
            description: 'An optional function that will take as arguments the initial process params and the data send by the deamon. You then can update the params depending on the data from the deamon and return the new params object to send to the "run" process method'
        }
    },
    _a);
//# sourceMappingURL=SProcessDeamonSettingInterface.js.map