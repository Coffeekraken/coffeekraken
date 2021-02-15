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
    var replaceTags_1 = __importDefault(require("../../html/replaceTags"));
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
            black: function (tag, content) { return "<span style=\"color: black\">" + content + "</span>"; },
            red: function (tag, content) { return "<span style=\"color: #FF0000\">" + content + "</span>"; },
            green: function (tag, content) { return "<span style=\"color: #008000\">" + content + "</span>"; },
            yellow: function (tag, content) { return "<span style=\"color: #F1C40F\">" + content + "</span>"; },
            blue: function (tag, content) { return "<span style=\"color: #0000FF\">" + content + "</span>"; },
            magenta: function (tag, content) { return "<span style=\"color: #800080\">" + content + "</span>"; },
            cyan: function (tag, content) { return "<span style=\"color: #5DADE2\">" + content + "</span>"; },
            white: function (tag, content) { return "<span style=\"color: white\">" + content + "</span>"; },
            bgBlack: function (tag, content) {
                return "<span style=\"background-color: black\">" + content + "</span>";
            },
            bgRed: function (tag, content) {
                return "<span style=\"background-color: #FF0000\">" + content + "</span>";
            },
            bgGreen: function (tag, content) {
                return "<span style=\"background-color: #008000\">" + content + "</span>";
            },
            bgYellow: function (tag, content) {
                return "<span style=\"background-color: #F1C40F\">" + content + "</span>";
            },
            bgBlue: function (tag, content) {
                return "<span style=\"background-color: #0000FF\">" + content + "</span>";
            },
            bgMagenta: function (tag, content) {
                return "<span style=\"background-color: #800080\">" + content + "</span>";
            },
            bgCyan: function (tag, content) {
                return "<span style=\"background-color: #5DADE2\">" + content + "</span>";
            },
            bgWhite: function (tag, content) {
                return "<span style=\"background-color: white\">" + content + "</span>";
            },
            bold: function (tag, content) {
                return "<span style=\"font-weight: bold;\">" + content + "</span>";
            },
            dim: function (tag, content) { return "<span style=\"\">" + content + "</span>"; },
            italic: function (tag, content) {
                return "<span style=\"font-style: italic;\">" + content + "</span>";
            },
            underline: function (tag, content) {
                return "<span style=\"font-style: underline;\">" + content + "</span>";
            },
            strike: function (tag, content) {
                return "<span text-decoration=\"line-through;\">" + content + "</span>";
            },
            br: function (tag, content) { return '<br />'; }
        });
    }
    exports.default = mail;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHVFQUFtRDtJQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxTQUFTLElBQUksQ0FBQyxJQUFJO1FBQ2hCLE9BQU8scUJBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDekIsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGtDQUE4QixPQUFPLFlBQVMsRUFBOUMsQ0FBOEM7WUFDdkUsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLG9DQUFnQyxPQUFPLFlBQVMsRUFBaEQsQ0FBZ0Q7WUFDdkUsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLG9DQUFnQyxPQUFPLFlBQVMsRUFBaEQsQ0FBZ0Q7WUFDekUsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLG9DQUFnQyxPQUFPLFlBQVMsRUFBaEQsQ0FBZ0Q7WUFDMUUsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLG9DQUFnQyxPQUFPLFlBQVMsRUFBaEQsQ0FBZ0Q7WUFDeEUsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLG9DQUFnQyxPQUFPLFlBQVMsRUFBaEQsQ0FBZ0Q7WUFDM0UsSUFBSSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLG9DQUFnQyxPQUFPLFlBQVMsRUFBaEQsQ0FBZ0Q7WUFDeEUsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLGtDQUE4QixPQUFPLFlBQVMsRUFBOUMsQ0FBOEM7WUFFdkUsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU87Z0JBQ3BCLE9BQUEsNkNBQXlDLE9BQU8sWUFBUztZQUF6RCxDQUF5RDtZQUMzRCxLQUFLLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztnQkFDbEIsT0FBQSwrQ0FBMkMsT0FBTyxZQUFTO1lBQTNELENBQTJEO1lBQzdELE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPO2dCQUNwQixPQUFBLCtDQUEyQyxPQUFPLFlBQVM7WUFBM0QsQ0FBMkQ7WUFDN0QsUUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU87Z0JBQ3JCLE9BQUEsK0NBQTJDLE9BQU8sWUFBUztZQUEzRCxDQUEyRDtZQUM3RCxNQUFNLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztnQkFDbkIsT0FBQSwrQ0FBMkMsT0FBTyxZQUFTO1lBQTNELENBQTJEO1lBQzdELFNBQVMsRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPO2dCQUN0QixPQUFBLCtDQUEyQyxPQUFPLFlBQVM7WUFBM0QsQ0FBMkQ7WUFDN0QsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU87Z0JBQ25CLE9BQUEsK0NBQTJDLE9BQU8sWUFBUztZQUEzRCxDQUEyRDtZQUM3RCxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztnQkFDcEIsT0FBQSw2Q0FBeUMsT0FBTyxZQUFTO1lBQXpELENBQXlEO1lBRTNELElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPO2dCQUNqQixPQUFBLHdDQUFvQyxPQUFPLFlBQVM7WUFBcEQsQ0FBb0Q7WUFDdEQsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLHNCQUFrQixPQUFPLFlBQVMsRUFBbEMsQ0FBa0M7WUFDekQsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU87Z0JBQ25CLE9BQUEseUNBQXFDLE9BQU8sWUFBUztZQUFyRCxDQUFxRDtZQUN2RCxTQUFTLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTztnQkFDdEIsT0FBQSw0Q0FBd0MsT0FBTyxZQUFTO1lBQXhELENBQXdEO1lBQzFELE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPO2dCQUNuQixPQUFBLDZDQUF5QyxPQUFPLFlBQVM7WUFBekQsQ0FBeUQ7WUFFM0QsRUFBRSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLFFBQVEsRUFBUixDQUFRO1NBQy9CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxJQUFJLENBQUMifQ==