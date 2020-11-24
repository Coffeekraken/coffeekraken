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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../process/SProcess", "./interface/SNpmBinInterface", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var SProcess_1 = __importDefault(require("../process/SProcess"));
    var SNpmBinInterface_1 = __importDefault(require("./interface/SNpmBinInterface"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    return (_a = /** @class */ (function (_super) {
            __extends(SNpmBinProcess, _super);
            /**
             * @name          constructor
             * @type          Function
             * @constructor
             *
             * Constructor
             *
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            function SNpmBinProcess(settings) {
                if (settings === void 0) { settings = {}; }
                return _super.call(this, deepMerge_2.default({
                    id: 'SNpmBinProcess',
                    name: 'Npm Bin Process'
                }, settings)) || this;
            }
            /**
             * @name              process
             * @type              Function
             *
             * Method that actually execute the process
             *
             * @param       {Object}       params           The arguments object that will be passed to the underlined actions stream instance
             * @param       {Object}       [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
             * @return      {Süromise}                       An SPomise instance representing the build process
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SNpmBinProcess.prototype.process = function (params, settings) {
                var _this = this;
                if (settings === void 0) { settings = {}; }
                setTimeout(function () {
                    var actionStream = new __SBuildJsActionsStream(__assign(__assign({}, settings), { logs: {
                            success: false,
                            start: false
                        } }));
                    _this._buildJsActionStream = actionStream.start(params);
                    _this.bindSPromise(_this._buildJsActionStream);
                }, 1000);
            };
            return SNpmBinProcess;
        }(SProcess_1.default)),
        _a.interface = SNpmBinInterface_1.default,
        _a);
});
