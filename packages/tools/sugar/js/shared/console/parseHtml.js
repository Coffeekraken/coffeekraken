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
        define(["require", "exports", "./html/tagsMap", "../is/terminal", "../html/replaceTags"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tagsMap_1 = __importDefault(require("./html/tagsMap"));
    var terminal_1 = __importDefault(require("../is/terminal"));
    var replaceTags_1 = __importDefault(require("../html/replaceTags"));
    /**
     * @name                                parseHtml
     * @namespace          sugar.js.console
     * @type                                Function
     *
     * Parse the simple html tags to format the console message
     *
     * @param           {String|Array}                  message                 The message to format of an array of messages to format
     * @return          {String}                                          The formated message
     *
     * @todo        interface
     * @todo        doc
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function parseHtml(message) {
        if (terminal_1.default()) {
            var fn = require(__dirname + "/../../node/terminal/parseHtml").default;
            return fn(message);
        }
        var isArray = false;
        if (Array.isArray(message)) {
            isArray = true;
        }
        else {
            message = [message];
        }
        message = message.map(function (m) {
            return replaceTags_1.default(m, tagsMap_1.default);
        });
        if (isArray)
            return message;
        return message[0];
    }
    exports.default = parseHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9jb25zb2xlL3BhcnNlSHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsMkRBQXVDO0lBQ3ZDLDREQUEwQztJQUMxQyxvRUFBZ0Q7SUFFaEQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsU0FBUyxTQUFTLENBQUMsT0FBTztRQUN4QixJQUFJLGtCQUFZLEVBQUUsRUFBRTtZQUNsQixJQUFNLEVBQUUsR0FBRyxPQUFPLENBQUksU0FBUyxtQ0FBZ0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN6RSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQjtRQUVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQjthQUFNO1lBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckI7UUFFRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUM7WUFDdEIsT0FBTyxxQkFBYSxDQUFDLENBQUMsRUFBRSxpQkFBUyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLE9BQU87WUFBRSxPQUFPLE9BQU8sQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0Qsa0JBQWUsU0FBUyxDQUFDIn0=