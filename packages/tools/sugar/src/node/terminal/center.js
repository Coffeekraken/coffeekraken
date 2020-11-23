"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const countLine_1 = __importDefault(require("../string/countLine"));
/**
 * @name                                    center
 * @namespace           sugar.node.terminal
 * @type                                    Function
 * @test                ./__tests__/center.test.js
 *
 * Allow to center one or more lines in the terminal depending on the process.env.STDOUT_PADDING environment variable
 * Settings:
 * - spaceChar (~) {String}: Which character to consider as a space that will be replaced by an actual space
 *
 * @param                 {String|Array}                  text                    The text to center or array of strings to center
 * @param                 {Object}                  [settings={}]           An object of settings
 * @return                {String}                                          The centered text
 *
 * @example             js
 * import center from '@coffeekraken/sugar/node/terminal/center';
 * center('Hello world'); // => '                 Hello world'
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function center(text, settings = {}) {
    settings = deepMerge_1.default({
        spaceChar: '~'
    }, settings);
    const maxWidth = process.stdout.columns - (process.env.STDOUT_PADDING || 0) * 2;
    let lines = Array.isArray(text) ? text : text.split('\n');
    lines = lines.map((l) => {
        const lineLenght = countLine_1.default(l);
        return (' '.repeat(Math.round(maxWidth / 2 - lineLenght / 2)) + l)
            .split(settings.spaceChar)
            .join(' ');
    });
    return Array.isArray(text) ? lines : lines.join('\n');
}
exports.default = center;
