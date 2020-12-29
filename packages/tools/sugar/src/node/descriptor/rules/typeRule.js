"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ofType_1 = __importDefault(require("../../is/ofType"));
const _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
const ruleObj = {
    name: 'Type',
    id: 'type',
    settings: {},
    message: (resultObj) => {
        return `This value has to be of type "<yellow>${resultObj.$expected.type}</yellow>". Received "<red>${resultObj.$received.type}</red>"`;
    },
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        const res = ofType_1.default(value, params.value, {
            name: settings.name
        });
        if (res !== true)
            return res;
        return true;
    }
};
// register the new rule
_SDescriptor_1.default.registerRule(ruleObj);
exports.default = ruleObj;
//# sourceMappingURL=typeRule.js.map