// @ts-nocheck
// @shared
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
     * @name          typeDefinitionArrayObjectToString
     * @namespace     sugar.js.value
     * @type          Function
     * @status              beta
     *
     * This function take as parameter a type definition object like this one:
     * {
     *    type: [{
     *      type: 'Array',
     *      of: [{
     *        type: 'Boolean'
     *      }]
     *    }]
     * }
     * an transform it to a string like so "Array<Boolean>"
     *
     * @param       {Object}        typeDefinitionArrayObj       The type definition array object
     * @return      {String}                                The string representation of the type definition object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import typeDefinitionArrayObjToString from '@coffeekraken/sugar/js/value/typeDefinitionArrayObjectToString'
     * typeDefinitionArrayObjToString([{
     *    type: [{
     *      type: 'Array',
     *      of: [{
     *        type: 'Boolean'
     *      }]
     *    }]
     * }]); // => Array<Boolean>
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function typeDefinitionArrayObjectToString(typeDefinitionArrayObj) {
        const parts = [];
        if (!Array.isArray(typeDefinitionArrayObj))
            typeDefinitionArrayObj = [typeDefinitionArrayObj];
        typeDefinitionArrayObj.forEach((definition) => {
            let part = definition.type;
            if (definition.of) {
                const ofString = typeDefinitionArrayObjectToString(definition.of);
                part += `<${ofString}>`;
            }
            parts.push(part);
        });
        return parts.join('|');
    }
    exports.default = typeDefinitionArrayObjectToString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7SUFFVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFDRztJQUNILFNBQVMsaUNBQWlDLENBQUMsc0JBQXNCO1FBQy9ELE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUN4QyxzQkFBc0IsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFcEQsc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDNUMsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUMzQixJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pCLE1BQU0sUUFBUSxHQUFHLGlDQUFpQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxJQUFJLElBQUksUUFBUSxHQUFHLENBQUM7YUFDekI7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxrQkFBZSxpQ0FBaUMsQ0FBQyJ9