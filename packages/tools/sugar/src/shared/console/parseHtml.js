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
        define(["require", "exports", "./html/tagsMap", "../is/terminal", "../html/replaceTags"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const tagsMap_1 = __importDefault(require("./html/tagsMap"));
    const terminal_1 = __importDefault(require("../is/terminal"));
    const replaceTags_1 = __importDefault(require("../html/replaceTags"));
    /**
     * @name                                parseHtml
     * @namespace            js.console
     * @type                                Function
     *
     * Parse the simple html tags to format the console message
     *
     * @param           {String|Array}                  message                 The message to format of an array of messages to format
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
            const fn = require(`${__dirname}/../../node/terminal/parseHtml`).default;
            return fn(message);
        }
        let isArray = false;
        if (Array.isArray(message)) {
            isArray = true;
        }
        else {
            message = [message];
        }
        message = message.map((m) => {
            return replaceTags_1.default(m, tagsMap_1.default);
        });
        if (isArray)
            return message;
        return message[0];
    }
    exports.default = parseHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDZEQUF1QztJQUN2Qyw4REFBMEM7SUFDMUMsc0VBQWdEO0lBRWhEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILFNBQVMsU0FBUyxDQUFDLE9BQU87UUFDeEIsSUFBSSxrQkFBWSxFQUFFLEVBQUU7WUFDbEIsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsU0FBUyxnQ0FBZ0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN6RSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQjtRQUVELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQjthQUFNO1lBQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckI7UUFFRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzFCLE9BQU8scUJBQWEsQ0FBQyxDQUFDLEVBQUUsaUJBQVMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPO1lBQUUsT0FBTyxPQUFPLENBQUM7UUFDNUIsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9