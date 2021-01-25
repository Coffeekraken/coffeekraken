"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const trimLines_js_1 = __importDefault(require("../string/trimLines.js"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const toString_1 = __importDefault(require("../string/toString"));
module.exports = class SError extends Error {
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
            stackArray = stack.split(' at ').slice(1);
            stackArray
                .filter((l) => {
                if (l.trim() === 'Error')
                    return false;
                if (l.trim() === '')
                    return false;
                return true;
            })
                .forEach((l) => {
                if (l.trim() === '')
                    return;
                finalStackArray.push(`<cyan>│</cyan> at <cyan>${l.replace(packageRoot, '')}</cyan>`);
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
};
//# sourceMappingURL=SError.js.map