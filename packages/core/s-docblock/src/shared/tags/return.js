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
        define(["require", "exports", "@coffeekraken/sugar/shared/string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const upperFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/string/upperFirst"));
    /**
     * @name              return
     * @namespace           shared.tags
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
        const stringArray = data.value.trim().split(/(?<=^\S+)\s/);
        return {
            type: stringArray[0]
                ? upperFirst_1.default(stringArray[0].replace('{', '').replace('}', '').trim())
                : '',
            description: stringArray[1] ? stringArray[1].trim() : ''
        };
    }
    exports.default = returnTag;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmV0dXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDhGQUF3RTtJQUV4RTs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILFNBQVMsU0FBUyxDQUFDLElBQUk7UUFDckIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0QsT0FBTztZQUNMLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsb0JBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2RSxDQUFDLENBQUMsRUFBRTtZQUNOLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUN6RCxDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLFNBQVMsQ0FBQyJ9