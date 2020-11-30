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
        name: 'Required',
        id: 'required',
        settings: {
            when: [undefined, null]
        },
        message: 'This value is required',
        processParams: function (params) {
            return { value: params };
        },
        apply: function (value, params, ruleSettings, settings) {
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
});
