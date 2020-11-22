"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDescriptor_1 = __importDefault(require("../SDescriptor"));
const ruleObj = {
    name: 'Required',
    id: 'required',
    settings: {
        when: [undefined, null, '']
    },
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        if (params.value === true) {
            if (ruleSettings.when.indexOf(value) !== -1) {
                return {};
            }
        }
        return true;
    }
};
// register the new rule
SDescriptor_1.default.registerRule(ruleObj);
exports.default = ruleObj;
