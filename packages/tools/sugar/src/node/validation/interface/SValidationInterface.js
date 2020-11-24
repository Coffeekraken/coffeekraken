"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SValidationInterface extends SInterface_1.default {
    },
    _a.definitionObj = {
        apply: {
            type: 'Function',
            required: true,
            description: 'This is the method that must be used when you want to validate a value.',
            static: true
        },
        exec: {
            type: 'Function',
            required: true,
            description: 'This is the method that will be called to validate the passed value. This method has to return true of false depending on the check result',
            static: true
        }
    },
    _a);
