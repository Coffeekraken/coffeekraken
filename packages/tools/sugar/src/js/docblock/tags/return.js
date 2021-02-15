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
        define(["require", "exports", "../../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var upperFirst_1 = __importDefault(require("../../string/upperFirst"));
    /**
     * @name              return
     * @namespace           sugar.js.docblock.tags
     * @type              Function
     * @status              wip
     *
     * Parse the return tag
     *
     * @param       {Object}          data        The data object parsed in the string
     * @return      {Object}                      The formated object
     *
     * @todo      interface
     * @todo      doc
     *
     * @since     2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    function returnTag(data) {
        var stringArray = data.value.trim().split(/(?<=^\S+)\s/);
        return {
            type: stringArray[0]
                ? upperFirst_1.default(stringArray[0].replace('{', '').replace('}', '').trim())
                : '',
            description: stringArray[1] ? stringArray[1].trim() : ''
        };
    }
    exports.default = returnTag;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV0dXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVix1RUFBbUQ7SUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJO1FBQ3JCLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNELE9BQU87WUFDTCxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLG9CQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdkUsQ0FBQyxDQUFDLEVBQUU7WUFDTixXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDekQsQ0FBQztJQUNKLENBQUM7SUFDRCxrQkFBZSxTQUFTLENBQUMifQ==