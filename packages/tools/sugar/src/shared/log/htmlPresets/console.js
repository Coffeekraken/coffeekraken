// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../html/replaceTags", "chalk"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnNvbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQseUVBQW1EO0lBQ25ELGtEQUE0QjtJQUM1QixlQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUVsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJO1FBQ3JCLE9BQU8scUJBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDekIsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDL0MsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDM0MsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDL0MsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDakQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDbkQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0MsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFFL0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDbkQsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDL0MsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDbkQsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDckQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDakQsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDakQsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFFbkQsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDN0MsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDM0MsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDakQsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7WUFDdkQsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsZUFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFFakQsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSTtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=