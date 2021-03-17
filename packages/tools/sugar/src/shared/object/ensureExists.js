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
        define(["require", "exports", "./get", "./set"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const get_1 = __importDefault(require("./get"));
    const set_1 = __importDefault(require("./set"));
    /**
     * @name                        ensureExists
     * @namespace           sugar.js.object
     * @type                        Function
     * @stable
     *
     * Pass a string like "my.cool.object" and the value it has to be and this function will ensure that this deep object exist
     *
     * @param           {Object}            obj                           The object on which to check the path existence
     * @param           {String}            path                           The dotted object path to check
     * @param           {Mixed}             value                         The value to set to the object path created if not already exist
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example           js
     * import ensureExists from '@coffeekraken/sugar/js/object/ensureExists';
     * const myObj = { hello: 'world' }«
     * ensureExists(myObj, 'cool.object', {});
     * // { hello: 'world', cool: { object: {} } }
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    exports.default = (obj, path, value = {}) => {
        const v = get_1.default(obj, path);
        if (v === undefined) {
            set_1.default(obj, path, value);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5zdXJlRXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW5zdXJlRXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFVixnREFBMEI7SUFDMUIsZ0RBQTBCO0lBRTFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F3Qkc7SUFDSCxrQkFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sQ0FBQyxHQUFHLGFBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ25CLGFBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQyxDQUFDIn0=