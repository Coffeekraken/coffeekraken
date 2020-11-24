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
    /**
     * @wip
     * @todo      interface
     * @todo      doc
     * @todo      tests
     */
    var SInterface_1 = __importDefault(require("../../class/SInterface"));
    return (_a = /** @class */ (function (_super) {
            __extends(SNpmBinInterface, _super);
            function SNpmBinInterface() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SNpmBinInterface;
        }(SInterface_1.default)),
        _a.definitionObj = {
            action: {
                type: 'String',
                required: true,
                alias: 'a',
                values: ['install', 'i', 'uninstall', 'u', 'un'],
                description: 'Specify which action you want to execute in the "bin" module'
            },
            global: {
                type: 'Boolean',
                required: true,
                alias: 'g',
                description: 'Specify if you want to symlink the passed bin in the global scope or in local one',
                default: false
            },
            package: {
                type: 'String',
                alias: 'p',
                description: "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
                default: null
            },
            bin: {
                type: 'String',
                alias: 'b',
                description: 'Specify the bin you want to symlink',
                default: null
            }
        },
        _a);
});
