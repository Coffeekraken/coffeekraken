"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replaceTags_1 = __importDefault(require("../../html/replaceTags"));
const chalk_1 = __importDefault(require("chalk"));
chalk_1.default.level = 3;
/**
 * @name                              console
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 * @status              wip
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
exports.default = consoleFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvbG9nL2h0bWxQcmVzZXRzL2NvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLHlFQUFtRDtBQUNuRCxrREFBNEI7QUFDNUIsZUFBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFbEI7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSTtJQUNyQixPQUFPLHFCQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3pCLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQy9DLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzNDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQy9DLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pELElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBRS9DLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25ELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQy9DLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQ25ELFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ3JELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pELFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3ZELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBRW5ELElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzNDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ2pELFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ3ZELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGVBQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRWpELEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUk7S0FDM0IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGtCQUFlLFNBQVMsQ0FBQyJ9