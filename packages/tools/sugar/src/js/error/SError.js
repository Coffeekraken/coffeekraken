// @ts-nocheck
// @shared
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
        define(["require", "exports", "../console/parseHtml", "../string/trimLines.js", "../path/packageRoot", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var trimLines_js_1 = __importDefault(require("../string/trimLines.js"));
    var packageRoot_1 = __importDefault(require("../path/packageRoot"));
    var toString_1 = __importDefault(require("../string/toString"));
    return /** @class */ (function (_super) {
        __extends(SError, _super);
        function SError(message) {
            var _this = this;
            if (typeof message !== 'string') {
                if (Array.isArray(message)) {
                    message = message.join('\n');
                }
                else {
                    message = toString_1.default(message);
                }
            }
            // filter message for integrated stack
            message = message
                .split('\n')
                .filter(function (line) {
                if (line.trim().slice(0, 10) === 'Thrown at:')
                    return false;
                if (line.trim().slice(0, 3) === 'at ')
                    return false;
                return true;
            })
                .join('\n');
            _this = _super.call(this, message) || this;
            if (Error && Error.captureStackTrace) {
                Error.captureStackTrace(_this, _this.constructor);
            }
            var stack = [];
            var packageRoot = packageRoot_1.default();
            var stackArray = [];
            if (_this.stack) {
                stackArray = _this.stack.split(' at ').slice(1);
                stackArray
                    .filter(function (l) {
                    if (l.trim() === 'Error')
                        return false;
                    if (l.trim() === '')
                        return false;
                    return true;
                })
                    .forEach(function (l) {
                    if (l.trim() === '')
                        return;
                    stack.push("<cyan>\u2502</cyan> at <cyan>" + l.replace(packageRoot, '') + "</cyan>");
                });
            }
            _this.name = _this.constructor.name;
            _this.message = trimLines_js_1.default(parseHtml_1.default("\n      <red><underline>" + (_this.name || _this.constructor.name) + "</underline></red>\n\n      " + message + "\n\n      " + stack.join('') + "\n    "));
            var displayed = false;
            Object.defineProperty(_this, 'stack', {
                get: function () {
                    if (displayed)
                        return '';
                    displayed = true;
                    return this.message;
                },
                set: function (value) {
                    this._stack = value;
                }
            });
            _this.stack = trimLines_js_1.default(parseHtml_1.default(stack.join('')));
            return _this;
        }
        return SError;
    }(Error));
});
