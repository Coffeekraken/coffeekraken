// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../class/SInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var SInterface_1 = __importDefault(require("../../class/SInterface"));
    return (_a = /** @class */ (function (_super) {
            __extends(SProcessInterface, _super);
            function SProcessInterface() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SProcessInterface;
        }(SInterface_1.default)),
        // static extendsArray = ['SProcess', 'SPromise'];
        _a.definitionObj = {
            id: {
                type: 'String',
                required: true
            },
            state: {
                type: 'String',
                required: true,
                values: ['idle', 'running', 'killed', 'error', 'success', 'watching']
            },
            duration: {
                type: 'Number',
                required: true
            },
            startTime: {
                type: 'Number',
                required: true
            },
            endTime: {
                type: 'Number',
                required: true
            },
            stdout: {
                type: 'Array<String>',
                required: true,
                default: []
            },
            stderr: {
                type: 'Array<String>',
                required: true,
                default: []
            },
            process: {
                type: 'Function',
                required: true
            },
            kill: {
                type: 'Function',
                required: true
            },
            log: {
                type: 'Function',
                required: true
            }
        },
        _a.title = 'SProcess elements Interface',
        _a.description = 'This interface represent the minimum requirements that MUST have the instance that run some commands etc across the entire toolkit',
        _a);
});
