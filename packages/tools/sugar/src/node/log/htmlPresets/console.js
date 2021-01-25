"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const replaceTags_1 = __importDefault(require("../../html/replaceTags"));
const chalk_1 = __importDefault(require("chalk"));
chalk_1.default.level = 3;
/**
 * @name                              console
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 * @wip
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the terminal
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function consoleFn(text) {
    return replaceTags_1.default(text, {
        black: (tag, content) => chalk_1.default.black(content),
        red: (tag, content) => chalk_1.default.red(content),
        green: (tag, content) => chalk_1.default.green(content),
        yellow: (tag, content) => chalk_1.default.yellow(content),
        blue: (tag, content) => chalk_1.default.blue(content),
        magenta: (tag, content) => chalk_1.default.magenta(content),
        cyan: (tag, content) => chalk_1.default.cyan(content),
        white: (tag, content) => chalk_1.default.white(content),
        bgBlack: (tag, content) => chalk_1.default.bgBlack(content),
        bgRed: (tag, content) => chalk_1.default.bgRed(content),
        bgGreen: (tag, content) => chalk_1.default.bgGreen(content),
        bgYellow: (tag, content) => chalk_1.default.bgYellow(content),
        bgBlue: (tag, content) => chalk_1.default.bgBlue(content),
        bgMagenta: (tag, content) => chalk_1.default.bgMagenta(content),
        bgCyan: (tag, content) => chalk_1.default.bgCyan(content),
        bgWhite: (tag, content) => chalk_1.default.bgWhite(content),
        bold: (tag, content) => chalk_1.default.bold(content),
        dim: (tag, content) => chalk_1.default.dim(content),
        italic: (tag, content) => chalk_1.default.italic(content),
        underline: (tag, content) => chalk_1.default.underline(content),
        strike: (tag, content) => chalk_1.default.strike(content),
        br: (tag, content) => '\n'
    });
}
module.exports = consoleFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7O0FBRVYseUVBQW1EO0FBQ25ELGtEQUE0QjtBQUM1QixlQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUVsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJO0lBQ3JCLE9BQU8scUJBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDekIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDL0MsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDM0MsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDL0MsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFL0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkQsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDL0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDbkQsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDckQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakQsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDdkQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakQsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFFbkQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0MsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDM0MsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDakQsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFDdkQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFakQsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSTtLQUMzQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsaUJBQVMsU0FBUyxDQUFDIn0=