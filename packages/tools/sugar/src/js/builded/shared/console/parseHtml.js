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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL2NvbnNvbGUvcGFyc2VIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFViwyREFBdUM7SUFDdkMsNERBQTBDO0lBQzFDLG9FQUFnRDtJQUVoRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxPQUFPO1FBQ3hCLElBQUksa0JBQVksRUFBRSxFQUFFO1lBQ2xCLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBSSxTQUFTLG1DQUFnQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQ3pFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BCO1FBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUMxQixPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2hCO2FBQU07WUFDTCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyQjtRQUVELE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQztZQUN0QixPQUFPLHFCQUFhLENBQUMsQ0FBQyxFQUFFLGlCQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTztZQUFFLE9BQU8sT0FBTyxDQUFDO1FBQzVCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxrQkFBZSxTQUFTLENBQUMifQ==