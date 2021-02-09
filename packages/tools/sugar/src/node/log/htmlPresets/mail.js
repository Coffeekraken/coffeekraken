"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const replaceTags_1 = __importDefault(require("../../html/replaceTags"));
/**
 * @name                              mail
 * @namespace           sugar.js.log.htmlPresets
 * @type                              Function
 * @status              wip
 *
 * Replace all the "log" html tags like "<red>", "<bold>", etc... with the corresponding syntax for mail formating
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
function mail(text) {
    return replaceTags_1.default(text, {
        black: (tag, content) => `<span style="color: black">${content}</span>`,
        red: (tag, content) => `<span style="color: #FF0000">${content}</span>`,
        green: (tag, content) => `<span style="color: #008000">${content}</span>`,
        yellow: (tag, content) => `<span style="color: #F1C40F">${content}</span>`,
        blue: (tag, content) => `<span style="color: #0000FF">${content}</span>`,
        magenta: (tag, content) => `<span style="color: #800080">${content}</span>`,
        cyan: (tag, content) => `<span style="color: #5DADE2">${content}</span>`,
        white: (tag, content) => `<span style="color: white">${content}</span>`,
        bgBlack: (tag, content) => `<span style="background-color: black">${content}</span>`,
        bgRed: (tag, content) => `<span style="background-color: #FF0000">${content}</span>`,
        bgGreen: (tag, content) => `<span style="background-color: #008000">${content}</span>`,
        bgYellow: (tag, content) => `<span style="background-color: #F1C40F">${content}</span>`,
        bgBlue: (tag, content) => `<span style="background-color: #0000FF">${content}</span>`,
        bgMagenta: (tag, content) => `<span style="background-color: #800080">${content}</span>`,
        bgCyan: (tag, content) => `<span style="background-color: #5DADE2">${content}</span>`,
        bgWhite: (tag, content) => `<span style="background-color: white">${content}</span>`,
        bold: (tag, content) => `<span style="font-weight: bold;">${content}</span>`,
        dim: (tag, content) => `<span style="">${content}</span>`,
        italic: (tag, content) => `<span style="font-style: italic;">${content}</span>`,
        underline: (tag, content) => `<span style="font-style: underline;">${content}</span>`,
        strike: (tag, content) => `<span text-decoration="line-through;">${content}</span>`,
        br: (tag, content) => '<br />'
    });
}
exports.default = mail;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLHlFQUFtRDtBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJO0lBQ2hCLE9BQU8scUJBQWEsQ0FBQyxJQUFJLEVBQUU7UUFDekIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsOEJBQThCLE9BQU8sU0FBUztRQUN2RSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxnQ0FBZ0MsT0FBTyxTQUFTO1FBQ3ZFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGdDQUFnQyxPQUFPLFNBQVM7UUFDekUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZ0NBQWdDLE9BQU8sU0FBUztRQUMxRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxnQ0FBZ0MsT0FBTyxTQUFTO1FBQ3hFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGdDQUFnQyxPQUFPLFNBQVM7UUFDM0UsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZ0NBQWdDLE9BQU8sU0FBUztRQUN4RSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyw4QkFBOEIsT0FBTyxTQUFTO1FBRXZFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN4Qix5Q0FBeUMsT0FBTyxTQUFTO1FBQzNELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN0QiwyQ0FBMkMsT0FBTyxTQUFTO1FBQzdELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN4QiwyQ0FBMkMsT0FBTyxTQUFTO1FBQzdELFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN6QiwyQ0FBMkMsT0FBTyxTQUFTO1FBQzdELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN2QiwyQ0FBMkMsT0FBTyxTQUFTO1FBQzdELFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUMxQiwyQ0FBMkMsT0FBTyxTQUFTO1FBQzdELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN2QiwyQ0FBMkMsT0FBTyxTQUFTO1FBQzdELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN4Qix5Q0FBeUMsT0FBTyxTQUFTO1FBRTNELElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUNyQixvQ0FBb0MsT0FBTyxTQUFTO1FBQ3RELEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixPQUFPLFNBQVM7UUFDekQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3ZCLHFDQUFxQyxPQUFPLFNBQVM7UUFDdkQsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQzFCLHdDQUF3QyxPQUFPLFNBQVM7UUFDMUQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3ZCLHlDQUF5QyxPQUFPLFNBQVM7UUFFM0QsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsUUFBUTtLQUMvQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=