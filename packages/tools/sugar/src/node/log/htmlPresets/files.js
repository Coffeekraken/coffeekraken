"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replaceTags_1 = __importDefault(require("../../html/replaceTags"));
/**
 * @name                              files
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 * @status              wip
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for the files
 *
 * @param                   {String}                      text                        The text to process
 * @return                  {String}                                                  The processed text ready for the terminal
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function files(text) {
    return replaceTags_1.default(text, {
        black: (tag, content) => content,
        red: (tag, content) => content,
        green: (tag, content) => content,
        yellow: (tag, content) => content,
        blue: (tag, content) => content,
        magenta: (tag, content) => content,
        cyan: (tag, content) => content,
        white: (tag, content) => content,
        bgBlack: (tag, content) => content,
        bgRed: (tag, content) => content,
        bgGreen: (tag, content) => content,
        bgYellow: (tag, content) => content,
        bgBlue: (tag, content) => content,
        bgMagenta: (tag, content) => content,
        bgCyan: (tag, content) => content,
        bgWhite: (tag, content) => content,
        bold: (tag, content) => content,
        dim: (tag, content) => content,
        italic: (tag, content) => content,
        underline: (tag, content) => content,
        strike: (tag, content) => content,
        br: (tag, content) => '\n'
    });
}
exports.default = files;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYseUVBQW1EO0FBRW5EOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILFNBQVMsS0FBSyxDQUFDLElBQUk7SUFDakIsT0FBTyxxQkFBYSxDQUFDLElBQUksRUFBRTtRQUN6QixLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2hDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDOUIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUNoQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2pDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDL0IsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUNsQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQy9CLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFFaEMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUNsQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDbEMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUNuQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2pDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDcEMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUNqQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBRWxDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDL0IsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUM5QixNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2pDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDcEMsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUVqQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxJQUFJO0tBQzNCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFDRCxrQkFBZSxLQUFLLENBQUMifQ==