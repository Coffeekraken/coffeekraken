"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../class/SInterface"));
module.exports = (_a = class STestInterface extends SInterface_1.default {
    },
    _a.definition = {
        input: {
            type: 'String',
            alias: 'i',
            description: 'Input files glob pattern',
            required: true,
            level: 1
        },
        watch: {
            type: 'String|Object',
            alias: 'w',
            description: 'Watch files glob pattern or settings object',
            level: 1
        }
    },
    _a);
//# sourceMappingURL=module.js.map