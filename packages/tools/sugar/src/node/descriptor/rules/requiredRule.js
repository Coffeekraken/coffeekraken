"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
const ruleObj = {
    name: 'Required',
    id: 'required',
    settings: {
        when: [undefined, null]
    },
    message: 'This value is required',
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        if (params.value === true) {
            if (ruleSettings.when.indexOf(value) !== -1) {
                return false;
            }
        }
        return true;
    }
};
// register the new rule
_SDescriptor_1.default.registerRule(ruleObj);
exports.default = ruleObj;
