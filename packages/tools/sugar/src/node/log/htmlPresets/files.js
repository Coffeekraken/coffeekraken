"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = files;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7QUFFVix5RUFBbUQ7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSTtJQUNqQixPQUFPLHFCQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3pCLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDaEMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUM5QixLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2hDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDakMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUMvQixPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2xDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDL0IsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUVoQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2xDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDaEMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUNsQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ25DLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDakMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUNwQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQ2pDLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFFbEMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUMvQixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBQzlCLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU87UUFDakMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTztRQUNwQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPO1FBRWpDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUk7S0FDM0IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUNELGlCQUFTLEtBQUssQ0FBQyJ9