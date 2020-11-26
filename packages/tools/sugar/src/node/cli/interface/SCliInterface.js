"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SCliInterface extends SInterface_1.default {
    },
    _a.definition = {
        interface: {
            type: 'SInterface',
            required: true,
            static: true
        },
        processClass: {
            type: 'SProcessManager',
            required: true,
            static: true
        },
        command: {
            type: 'String',
            required: true,
            static: true
        }
    },
    _a);
