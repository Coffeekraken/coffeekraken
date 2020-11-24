"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SOutputProcessInterface extends SInterface_1.default {
    },
    _a.definitionObj = {
        on: {
            type: 'Function',
            required: true
        }
    },
    _a);
