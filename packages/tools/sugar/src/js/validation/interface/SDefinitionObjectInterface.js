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
        define(["require", "exports", "../object/validateObject"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var validateObject_2 = __importDefault(require("../object/validateObject"));
    return (_a = /** @class */ (function () {
            function SDefinitionObjectInterface() {
            }
            SDefinitionObjectInterface.apply = function (instance) {
                return validateObject_2.default(instance, this.definitionObj);
            };
            return SDefinitionObjectInterface;
        }()),
        _a.definitionObj = {
            type: {
                type: 'String',
                required: true
            },
            required: {
                type: 'Boolean'
            },
            description: {
                type: 'String'
            },
            default: {
                type: null
            },
            static: {
                type: 'Boolean'
            },
            values: {
                type: 'Array'
            },
            regexp: {
                type: 'RegExp'
            },
            validator: {
                type: 'Function'
            },
            alias: {
                type: 'String'
            },
            level: {
                type: 'Integer'
            }
        },
        _a);
});
