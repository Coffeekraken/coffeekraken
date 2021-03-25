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
        define(["require", "exports", "../console/parseHtml", "../string/trimLines.js", "../path/packageRoot", "../string/toString"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const parseHtml_1 = __importDefault(require("../console/parseHtml"));
    const trimLines_js_1 = __importDefault(require("../string/trimLines.js"));
    const packageRoot_1 = __importDefault(require("../path/packageRoot"));
    const toString_1 = __importDefault(require("../string/toString"));
    /**
     * @todo      interface
     * @todo      doc
     * @todo      tests
     */
    class SError extends Error {
        constructor(messageOrError) {
            let stack, message, originalMessage;
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
                .filter((line) => {
                if (line.trim().slice(0, 10) === 'Thrown at:')
                    return false;
                if (line.trim().slice(0, 3) === 'at ')
                    return false;
                return true;
            })
                .join('\n');
            super(message);
            // if (Error && Error.captureStackTrace) {
            //   Error.captureStackTrace(this, this.constructor);
            // }
            let stackArray = [], finalStackArray = [];
            const packageRoot = packageRoot_1.default();
            if (stack) {
                stackArray = stack.split('\n').slice(1);
                stackArray
                    .filter((l) => {
                    if (l.trim() === 'Error')
                        return false;
                    if (l.trim() === '')
                        return false;
                    return true;
                })
                    .map((l) => {
                    l = l.trim();
                    l = l
                        .replace(/at\s(.*)\(([a-zA-Z0-9\/-_\.]+:[0-9]{1,10}:[0-9]{1,10})\)$/, '\n<cyan>|</cyan> <magenta>$1</magenta>\n<cyan>|</cyan> <cyan>$2</cyan>')
                        .replace(`${packageRoot_1.default(process.cwd(), true)}/`, '');
                    if (l.match(/^at\s/)) {
                        l = `\n<cyan>|</cyan> <cyan>${l.replace('at ', '')}</cyan>`;
                    }
                    if (l.match(/^->/)) {
                        l = `\n<yellow>|---></yellow><yellow>${l.replace('-> ', '')}</yellow>`;
                    }
                    return l;
                })
                    .forEach((l) => {
                    if (l.trim() === '')
                        return;
                    finalStackArray.push(l);
                });
            }
            this.name = '';
            this.message = trimLines_js_1.default(parseHtml_1.default(`
      <red><underline>${this.name || this.constructor.name}</underline></red>

      ${message}

      ${finalStackArray.join('')}
    `));
            this.stack = null;
            this.code = null;
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
    }
    exports.default = SError;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHFFQUErQztJQUMvQywwRUFBaUQ7SUFDakQsc0VBQWdEO0lBQ2hELGtFQUE0QztJQUU1Qzs7OztPQUlHO0lBRUgsTUFBcUIsTUFBTyxTQUFRLEtBQUs7UUFDdkMsWUFBWSxjQUFjO1lBQ3hCLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUM7WUFFcEMsSUFBSSxjQUFjLFlBQVksS0FBSyxFQUFFO2dCQUNuQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztnQkFDN0IsT0FBTyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7YUFDbEM7aUJBQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxRQUFRLEVBQUU7Z0JBQzdDLE9BQU8sR0FBRyxjQUFjLENBQUM7YUFDMUI7WUFDRCxlQUFlLEdBQUcsT0FBTyxDQUFDO1lBRTFCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUMvQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzFCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QjtxQkFBTTtvQkFDTCxPQUFPLEdBQUcsa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDL0I7YUFDRjtZQUVELHNDQUFzQztZQUN0QyxPQUFPLEdBQUcsT0FBTztpQkFDZCxLQUFLLENBQUMsSUFBSSxDQUFDO2lCQUNYLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDNUQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENB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