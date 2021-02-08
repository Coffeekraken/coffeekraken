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
    var replaceTags_1 = __importDefault(require("../../html/replaceTags"));
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
            black: function (tag, content) { return content; },
            red: function (tag, content) { return content; },
            green: function (tag, content) { return content; },
            yellow: function (tag, content) { return content; },
            blue: function (tag, content) { return content; },
            magenta: function (tag, content) { return content; },
            cyan: function (tag, content) { return content; },
            white: function (tag, content) { return content; },
            bgBlack: function (tag, content) { return content; },
            bgRed: function (tag, content) { return content; },
            bgGreen: function (tag, content) { return content; },
            bgYellow: function (tag, content) { return content; },
            bgBlue: function (tag, content) { return content; },
            bgMagenta: function (tag, content) { return content; },
            bgCyan: function (tag, content) { return content; },
            bgWhite: function (tag, content) { return content; },
            bold: function (tag, content) { return content; },
            dim: function (tag, content) { return content; },
            italic: function (tag, content) { return content; },
            underline: function (tag, content) { return content; },
            strike: function (tag, content) { return content; },
            br: function (tag, content) { return '\n'; }
        });
    }
    return files;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7SUFFVix1RUFBbUQ7SUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsU0FBUyxLQUFLLENBQUMsSUFBSTtRQUNqQixPQUFPLHFCQUFhLENBQUMsSUFBSSxFQUFFO1lBQ3pCLEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLEVBQVAsQ0FBTztZQUNoQyxHQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxFQUFQLENBQU87WUFDOUIsS0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sRUFBUCxDQUFPO1lBQ2hDLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLEVBQVAsQ0FBTztZQUNqQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxFQUFQLENBQU87WUFDL0IsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sRUFBUCxDQUFPO1lBQ2xDLElBQUksRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLEVBQVAsQ0FBTztZQUMvQixLQUFLLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxFQUFQLENBQU87WUFFaEMsT0FBTyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sRUFBUCxDQUFPO1lBQ2xDLEtBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLEVBQVAsQ0FBTztZQUNoQyxPQUFPLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxFQUFQLENBQU87WUFDbEMsUUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sRUFBUCxDQUFPO1lBQ25DLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLEVBQVAsQ0FBTztZQUNqQyxTQUFTLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxFQUFQLENBQU87WUFDcEMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sRUFBUCxDQUFPO1lBQ2pDLE9BQU8sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLEVBQVAsQ0FBTztZQUVsQyxJQUFJLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxFQUFQLENBQU87WUFDL0IsR0FBRyxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sRUFBUCxDQUFPO1lBQzlCLE1BQU0sRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxPQUFPLEVBQVAsQ0FBTztZQUNqQyxTQUFTLEVBQUUsVUFBQyxHQUFHLEVBQUUsT0FBTyxJQUFLLE9BQUEsT0FBTyxFQUFQLENBQU87WUFDcEMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLE9BQU8sSUFBSyxPQUFBLE9BQU8sRUFBUCxDQUFPO1lBRWpDLEVBQUUsRUFBRSxVQUFDLEdBQUcsRUFBRSxPQUFPLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSTtTQUMzQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsT0FBUyxLQUFLLENBQUMifQ==