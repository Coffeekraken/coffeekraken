// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SDescriptor_1 = __importDefault(require("../SDescriptor"));
    var ruleObj = {
        name: 'Required',
        id: 'required',
        settings: {
            when: [undefined, null, '']
        },
        processParams: function (params) {
            return { value: params };
        },
        apply: function (value, params, ruleSettings, settings) {
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
    return ruleObj;
});
