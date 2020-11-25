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
        define(["require", "exports", "../../is/ofType", "../_SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ofType_1 = __importDefault(require("../../is/ofType"));
    var _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
    var ruleObj = {
        name: 'Type',
        id: 'type',
        settings: {},
        message: function (resultObj) {
            return "This value has to be of type \"<yellow>" + resultObj.$expected.type + "</yellow>\". Received \"<red>" + resultObj.$received.type + "</red>\"";
        },
        processParams: function (params) {
            return { value: params };
        },
        apply: function (value, params, ruleSettings, settings) {
            var res = ofType_1.default(value, params.value);
            if (res !== true)
                return res;
            return true;
        }
    };
    // register the new rule
    _SDescriptor_1.default.registerRule(ruleObj);
    exports.default = ruleObj;
});
