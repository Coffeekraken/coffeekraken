"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class SProcessInterface extends SInterface_1.default {
    },
    // static extendsArray = ['SProcess', 'SPromise'];
    _a.definition = {
        id: {
            type: 'String',
            required: true
        },
        state: {
            type: 'String',
            required: true,
            values: ['idle', 'running', 'killed', 'error', 'success', 'watching']
        },
        duration: {
            type: 'Number',
            required: true
        },
        startTime: {
            type: 'Number',
            required: true
        },
        endTime: {
            type: 'Number',
            required: true
        },
        stdout: {
            type: 'Array<String>',
            required: true,
            default: []
        },
        stderr: {
            type: 'Array<String>',
            required: true,
            default: []
        },
        process: {
            type: 'Function',
            required: true
        },
        kill: {
            type: 'Function',
            required: true
        },
        log: {
            type: 'Function',
            required: true
        }
    },
    _a.title = 'SProcess elements Interface',
    _a.description = 'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit',
    _a);
//# sourceMappingURL=module.js.map