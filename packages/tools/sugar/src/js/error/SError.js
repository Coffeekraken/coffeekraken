"use strict";
// @ts-nocheck
// @shared
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFVixxRUFBK0M7QUFDL0MsMEVBQWlEO0FBQ2pELHNFQUFnRDtBQUNoRCxrRUFBNEM7QUFFNUM7Ozs7R0FJRztBQUVILE1BQXFCLE1BQU8sU0FBUSxLQUFLO0lBQ3ZDLFlBQVksY0FBYztRQUN4QixJQUFJLEtBQUssRUFBRSxPQUFPLEVBQUUsZUFBZSxDQUFDO1FBRXBDLElBQUksY0FBYyxZQUFZLEtBQUssRUFBRTtZQUNuQyxLQUFLLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztZQUM3QixPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQztTQUNsQzthQUFNLElBQUksT0FBTyxjQUFjLEtBQUssUUFBUSxFQUFFO1lBQzdDLE9BQU8sR0FBRyxjQUFjLENBQUM7U0FDMUI7UUFDRCxlQUFlLEdBQUcsT0FBTyxDQUFDO1FBRTFCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDMUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsT0FBTyxHQUFHLGtCQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDL0I7U0FDRjtRQUVELHNDQUFzQztRQUN0QyxPQUFPLEdBQUcsT0FBTzthQUNkLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUM1RCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENB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