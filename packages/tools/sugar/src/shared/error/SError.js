"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHFFQUErQztBQUMvQywwRUFBaUQ7QUFDakQsc0VBQWdEO0FBQ2hELGtFQUE0QztBQUU1Qzs7OztHQUlHO0FBRUgsTUFBcUIsTUFBTyxTQUFRLEtBQUs7SUFDdkMsWUFBWSxjQUFjO1FBQ3hCLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUM7UUFFcEMsSUFBSSxjQUFjLFlBQVksS0FBSyxFQUFFO1lBQ25DLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO1lBQzdCLE9BQU8sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDO1NBQ2xDO2FBQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxRQUFRLEVBQUU7WUFDN0MsT0FBTyxHQUFHLGNBQWMsQ0FBQztTQUMxQjtRQUNELGVBQWUsR0FBRyxPQUFPLENBQUM7UUFFMUIsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMxQixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMvQjtTQUNGO1FBRUQsc0NBQXNDO1FBQ3RDLE9BQU8sR0FBRyxPQUFPO2FBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNYLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxZQUFZO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1lBQzVELElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVB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