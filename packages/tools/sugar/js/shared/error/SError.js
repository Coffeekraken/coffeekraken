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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
    Object.defineProperty(exports, "__esModule", { value: true });
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var trimLines_js_1 = __importDefault(require("../string/trimLines.js"));
    var packageRoot_1 = __importDefault(require("../path/packageRoot"));
    var toString_1 = __importDefault(require("../string/toString"));
    /**
     * @todo      interface
     * @todo      doc
     * @todo      tests
     */
    var SError = /** @class */ (function (_super) {
        __extends(SError, _super);
        function SError(messageOrError) {
            var _this = this;
            var stack, message, originalMessage;
            if (messageOrError instanceof Error) {
                stack = messageOrError.stack;
                message = messageOrError.message;
            }
            else if (typeof messageOrError === 'string') {
                message = messageOrError;
            }
            originalMessage = message;
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
            // if (Error && Error.captureStackTrace) {
            //   Error.captureStackTrace(this, this.constructor);
            // }
            var stackArray = [], finalStackArray = [];
            var packageRoot = packageRoot_1.default();
            if (stack) {
                stackArray = stack.split('\n').slice(1);
                stackArray
                    .filter(function (l) {
                    if (l.trim() === 'Error')
                        return false;
                    if (l.trim() === '')
                        return false;
                    return true;
                })
                    .map(function (l) {
                    l = l.trim();
                    l = l
                        .replace(/at\s(.*)\(([a-zA-Z0-9\/-_\.]+:[0-9]{1,10}:[0-9]{1,10})\)$/, '\n<cyan>|</cyan> <magenta>$1</magenta>\n<cyan>|</cyan> <cyan>$2</cyan>')
                        .replace(packageRoot_1.default(process.cwd(), true) + "/", '');
                    if (l.match(/^at\s/)) {
                        l = "\n<cyan>|</cyan> <cyan>" + l.replace('at ', '') + "</cyan>";
                    }
                    if (l.match(/^->/)) {
                        l = "\n<yellow>|---></yellow><yellow>" + l.replace('-> ', '') + "</yellow>";
                    }
                    return l;
                })
                    .forEach(function (l) {
                    if (l.trim() === '')
                        return;
                    finalStackArray.push(l);
                });
            }
            _this.name = '';
            _this.message = trimLines_js_1.default(parseHtml_1.default("\n      <red><underline>" + (_this.name || _this.constructor.name) + "</underline></red>\n\n      " + message + "\n\n      " + finalStackArray.join('') + "\n    "));
            _this.stack = null;
            _this.code = null;
            return _this;
            // let displayed = false;
            // Object.defineProperty(this, 'stack', {
            //   get: function () {
            //     if (displayed) return '';
            //     displayed = true;
            //     return this.message;
            //   },
            //   set: function (value) {
            //     this._stack = value;
            //   }
            // });
            // this.stack = __trimLines(__parseHtml(stack.join('')));
        }
        return SError;
    }(Error));
    exports.default = SError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9lcnJvci9TRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLG1FQUErQztJQUMvQyx3RUFBaUQ7SUFDakQsb0VBQWdEO0lBQ2hELGdFQUE0QztJQUU1Qzs7OztPQUlHO0lBRUg7UUFBb0MsMEJBQUs7UUFDdkMsZ0JBQVksY0FBYztZQUExQixpQkFrR0M7WUFqR0MsSUFBSSxLQUFLLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQztZQUVwQyxJQUFJLGNBQWMsWUFBWSxLQUFLLEVBQUU7Z0JBQ25DLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO2dCQUM3QixPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQzthQUNsQztpQkFBTSxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsRUFBRTtnQkFDN0MsT0FBTyxHQUFHLGNBQWMsQ0FBQzthQUMxQjtZQUNELGVBQWUsR0FBRyxPQUFPLENBQUM7WUFFMUIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDMUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzlCO3FCQUFNO29CQUNMLE9BQU8sR0FBRyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUMvQjthQUNGO1lBRUQsc0NBQXNDO1lBQ3RDLE9BQU8sR0FBRyxPQUFPO2lCQUNkLEtBQUssQ0FBQyxJQUFJLENBQUM7aUJBQ1gsTUFBTSxDQUFDLFVBQUMsSUFBSTtnQkFDWCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFlBQVk7b0JBQUUsT0FB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