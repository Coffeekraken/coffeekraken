"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const countLine_1 = __importDefault(require("../string/countLine"));
/**
 * @name                                    center
 * @namespace           sugar.node.terminal
 * @type                                    Function
 * @status              beta
 *
 *
 * Allow to center one or more lines in the terminal depending on the process.env.STDOUT_PADDING environment variable
 * Settings:
 * - spaceChar (~) {String}: Which character to consider as a space that will be replaced by an actual space
 *
 * @param                 {String|Array}                  text                    The text to center or array of strings to center
 * @param                 {Object}                  [settings={}]           An object of settings
 * @return                {String}                                          The centered text
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo      move in "format" folder
 *
 * @example             js
 * import center from '@coffeekraken/sugar/node/terminal/center';
 * center('Hello world'); // => '                 Hello world'
 *
 * @since       2.0.0
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
module.exports = center;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7O0FBRWQsb0VBQThDO0FBQzlDLG9FQUE4QztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDakMsUUFBUSxHQUFHLG1CQUFXLENBQ3BCO1FBQ0UsU0FBUyxFQUFFLEdBQUc7S0FDZixFQUNELFFBQVEsQ0FDVCxDQUFDO0lBQ0YsTUFBTSxRQUFRLEdBQ1osT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFELEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdEIsTUFBTSxVQUFVLEdBQUcsbUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9ELEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUNELGlCQUFTLE1BQU0sQ0FBQyJ9