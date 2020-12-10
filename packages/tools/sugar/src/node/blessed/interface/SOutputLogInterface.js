"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
const LogInterface_1 = __importDefault(require("../../log/interface/LogInterface"));
module.exports = (_a = class SOutputLogInterface extends SInterface_1.default {
    },
    _a.definition = Object.assign(Object.assign({}, LogInterface_1.default.definition), { clear: {
            type: 'Boolean|Integer',
            description: 'If set to <yellow>true</yellow>, clear the entire output stream, otherwise you can specify a number of line(s) to clear',
            alias: 'c'
        }, temp: {
            type: 'Boolean',
            description: 'Set the log as temporary. This mean that it will dissapear on the next log action',
            alias: 't'
        }, group: {
            type: 'String',
            description: 'Specify a group in which to display the log',
            alias: 'g'
        }, mt: {
            type: 'Integer',
            description: 'Specify the margin top to apply',
            default: 0
        }, mb: {
            type: 'Integer',
            description: 'Specify the margin bottom to apply',
            default: 1
        } }),
    _a);
//# sourceMappingURL=module.js.map