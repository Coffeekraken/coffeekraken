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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL2Vycm9yL1NFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsbUVBQStDO0lBQy9DLHdFQUFpRDtJQUNqRCxvRUFBZ0Q7SUFDaEQsZ0VBQTRDO0lBRTVDOzs7O09BSUc7SUFFSDtRQUFvQywwQkFBSztRQUN2QyxnQkFBWSxjQUFjO1lBQTFCLGlCQWtHQztZQWpHQyxJQUFJLEtBQUssRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDO1lBRXBDLElBQUksY0FBYyxZQUFZLEtBQUssRUFBRTtnQkFDbkMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdCLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDO2FBQ2xDO2lCQUFNLElBQUksT0FBTyxjQUFjLEtBQUssUUFBUSxFQUFFO2dCQUM3QyxPQUFPLEdBQUcsY0FBYyxDQUFDO2FBQzFCO1lBQ0QsZUFBZSxHQUFHLE9BQU8sQ0FBQztZQUUxQixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMxQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDOUI7cUJBQU07b0JBQ0wsT0FBTyxHQUFHLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQy9CO2FBQ0Y7WUFFRCxzQ0FBc0M7WUFDdEMsT0FBTyxHQUFHLE9BQU87aUJBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDWCxNQUFNLENBQUMsVUFBQyxJQUFJO2dCQUNYLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWTtvQkFBRSxPQUFP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