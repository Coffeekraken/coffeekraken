"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const trimLines_js_1 = __importDefault(require("../string/trimLines.js"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const toString_1 = __importDefault(require("../string/toString"));
module.exports = class SError extends Error {
    constructor(message) {
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
        if (Error && Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        const stack = [];
        const packageRoot = packageRoot_1.default();
        let stackArray = [];
        if (this.stack) {
            stackArray = this.stack.split(' at ').slice(1);
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
                stack.push(`<cyan>│</cyan> at <cyan>${l.replace(packageRoot, '')}</cyan>`);
            });
        }
        this.name = this.constructor.name;
        this.message = trimLines_js_1.default(parseHtml_1.default(`
      <red><underline>${this.name || this.constructor.name}</underline></red>

      ${message}

      ${stack.join('')}
    `));
        let displayed = false;
        Object.defineProperty(this, 'stack', {
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
        this.stack = trimLines_js_1.default(parseHtml_1.default(stack.join('')));
    }
};
