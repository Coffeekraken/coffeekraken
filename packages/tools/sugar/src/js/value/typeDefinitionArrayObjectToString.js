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
        var parts = [];
        if (!Array.isArray(typeDefinitionArrayObj))
            typeDefinitionArrayObj = [typeDefinitionArrayObj];
        typeDefinitionArrayObj.forEach(function (definition) {
            var part = definition.type;
            if (definition.of) {
                var ofString = typeDefinitionArrayObjectToString(definition.of);
                part += "<" + ofString + ">";
            }
            parts.push(part);
        });
        return parts.join('|');
    }
    return typeDefinitionArrayObjectToString;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZURlZmluaXRpb25BcnJheU9iamVjdFRvU3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7OztJQUVWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUNHO0lBQ0gsU0FBUyxpQ0FBaUMsQ0FBQyxzQkFBc0I7UUFDL0QsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWpCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDO1lBQ3hDLHNCQUFzQixHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwRCxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO1lBQ3hDLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDM0IsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFO2dCQUNqQixJQUFNLFFBQVEsR0FBRyxpQ0FBaUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xFLElBQUksSUFBSSxNQUFJLFFBQVEsTUFBRyxDQUFDO2FBQ3pCO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsT0FBUyxpQ0FBaUMsQ0FBQyJ9