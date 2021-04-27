// shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name              mapTypeDescriptor
     * @namespace         sugar.js.type.descriptor
     * @type              ISTypeDescriptor
     *
     * Describe the type "set" with some utilities methods like "is", "cast", etc...
     *
     * @example         js
     * export default {
     *    name: 'String',
     *    id: 'string',
     *    is: (value) => typeof value === 'string',
     *    cast: (value) => '' + value,
     *    // etc...
     * };
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    const descriptor = {
        name: 'Set',
        id: 'set',
        is: (value) => value instanceof Set,
        cast: (value) => {
            if (value instanceof Set)
                return value;
            const set = new Set();
            set.add(value);
            return set;
        }
    };
    exports.default = descriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0VHlwZURlc2NyaXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXRUeXBlRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTOzs7Ozs7Ozs7Ozs7SUFJVDs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsTUFBTSxVQUFVLEdBQXFCO1FBQ25DLElBQUksRUFBRSxLQUFLO1FBQ1gsRUFBRSxFQUFFLEtBQUs7UUFDVCxFQUFFLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxHQUFHO1FBQ3hDLElBQUksRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFO1lBQ25CLElBQUksS0FBSyxZQUFZLEdBQUc7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDdkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2YsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQ0YsQ0FBQztJQUVGLGtCQUFlLFVBQVUsQ0FBQyJ9