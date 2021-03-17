// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../html/replaceTags"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHlFQUFtRDtJQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJO1FBQ2hCLE9BQU8scUJBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDekIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsOEJBQThCLE9BQU8sU0FBUztZQUN2RSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxnQ0FBZ0MsT0FBTyxTQUFTO1lBQ3ZFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGdDQUFnQyxPQUFPLFNBQVM7WUFDekUsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZ0NBQWdDLE9BQU8sU0FBUztZQUMxRSxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxnQ0FBZ0MsT0FBTyxTQUFTO1lBQ3hFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGdDQUFnQyxPQUFPLFNBQVM7WUFDM0UsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZ0NBQWdDLE9BQU8sU0FBUztZQUN4RSxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyw4QkFBOEIsT0FBTyxTQUFTO1lBRXZFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN4Qix5Q0FBeUMsT0FBTyxTQUFTO1lBQzNELEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN0QiwyQ0FBMkMsT0FBTyxTQUFTO1lBQzdELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN4QiwyQ0FBMkMsT0FBTyxTQUFTO1lBQzdELFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN6QiwyQ0FBMkMsT0FBTyxTQUFTO1lBQzdELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN2QiwyQ0FBMkMsT0FBTyxTQUFTO1lBQzdELFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUMxQiwyQ0FBMkMsT0FBTyxTQUFTO1lBQzdELE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN2QiwyQ0FBMkMsT0FBTyxTQUFTO1lBQzdELE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUN4Qix5Q0FBeUMsT0FBTyxTQUFTO1lBRTNELElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUNyQixvQ0FBb0MsT0FBTyxTQUFTO1lBQ3RELEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixPQUFPLFNBQVM7WUFDekQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3ZCLHFDQUFxQyxPQUFPLFNBQVM7WUFDdkQsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQzFCLHdDQUF3QyxPQUFPLFNBQVM7WUFDMUQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3ZCLHlDQUF5QyxPQUFPLFNBQVM7WUFFM0QsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsUUFBUTtTQUMvQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsSUFBSSxDQUFDIn0=