// @ts-nocheck
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
     * @namespace            js.value
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7OztJQUVkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUNHO0lBQ0gsU0FBUyxpQ0FBaUMsQ0FBQyxzQkFBc0I7UUFDL0QsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1lBQ3hDLHNCQUFzQixHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwRCxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUM1QyxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQzNCLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRTtnQkFDakIsTUFBTSxRQUFRLEdBQUcsaUNBQWlDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLElBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQzthQUN6QjtZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNELGtCQUFlLGlDQUFpQyxDQUFDIn0=