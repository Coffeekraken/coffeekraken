// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../_SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
    var ruleObj = {
        name: 'Max',
        id: 'max',
        settings: {},
        accept: 'Number',
        message: function (resultObj) {
            return "This value has to be maximum \"<yellow>" + resultObj.max + "</yellow>\". Received \"<red>" + resultObj.received + "</red>\"";
        },
        processParams: function (params) {
            return { value: params };
        },
        apply: function (value, params, ruleSettings, settings) {
            if (value > params.value) {
                return {
                    max: params.value,
                    received: value
                };
            }
            return true;
        }
    };
    // register the new rule
    _SDescriptor_1.default.registerRule(ruleObj);
    exports.default = ruleObj;
});
//# sourceMappingURL=maxRule.js.map