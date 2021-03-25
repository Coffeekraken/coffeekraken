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
        define(["require", "exports", "../object/deepMerge", "../is/integer", "../is/class", "../string/upperFirst"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const integer_1 = __importDefault(require("../is/integer"));
    const class_1 = __importDefault(require("../is/class"));
    const upperFirst_1 = __importDefault(require("../string/upperFirst"));
    /**
     * @name          typeof
     * @namespace          sugar.js.value
     * @type          Function
     * @status              beta
     *
     * This function return the correct type of the passed value.
     * It support the recognition of arrays and return 'Array' as property type.
     * You can olso ask the function to gives you the "of" types of the passed value. This mean that if you
     * pass an Array like so "[10,'Hello',true]" and that you ask for "of" types, it will returns you
     * "Array<Integer|String|Boolean>".
     * Another feature is to ask the result as an object like so:
     * {
     *    type: 'Array',
     *    of: ['Integer','String','Boolean']
     * }
     * You can ask also the typeof function to returns you the actual class name if the passed value is an instance
     * of an custom class.
     *
     * @param       {Mixed}    value    The value to get the type of
     * @param       {Object}    [settings={}]         An object of settings to configure your type get process:
     * - of (false) {Boolean}: Specify if you want to get the "child" properties types for Objects, Arrays and custom classes
     * - format ('String') {String}: Specify if you want back a String or an Object
     * - customClass (true) {Boolean}: Specify if you want the custom classes to return theirs real names or simply Object
     * @return      {String|Object}               The type in string format, of an object if the setting "object" is set to true
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import typeof from '@coffeekraken/sugar/js/value/typeof';
     * typeof(true); // => Boolean
     * typeof(10); // => Integer
     * typeof(12.4); // => Number
     * typeof(['Hello']); // => Array
     * typeof(['Hello',true], { of: true }); // => Array<String|Boolean>
     *
     * class MyCoolClass {
     *    // ...
     * }
     * const myInstance = new MyCoolClass();
     * typeof(myInstance, { customClass: true }); // => MyCoolClass
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function typeOf(value, settings = {}) {
        settings = deepMerge_1.default({
            of: false,
            customClass: true
        }, settings);
        // get the real type
        let type;
        if (Array.isArray(value))
            type = 'Array';
        else if (value instanceof Map)
            type = 'Map';
        else if (value === null)
            type = 'Null';
        else if (value === undefined)
            type = 'Undefined';
        else if (typeof value === 'string')
            type = 'String';
        else if (integer_1.default(value))
            type = 'Integer';
        else if (typeof value === 'number')
            type = 'Number';
        else if (typeof value === 'boolean')
            type = 'Boolean';
        else if (value instanceof RegExp)
            type = 'RegExp';
        else if (settings.customClass === true &&
            class_1.default(value) &&
            value.name !== undefined) {
            type = upperFirst_1.default(value.name);
        }
        else if (settings.customClass === true &&
            value.constructor !== undefined &&
            value.constructor.name !== undefined) {
            type = upperFirst_1.default(value.constructor.name);
        }
        else if (settings.customClass === false && class_1.default(value)) {
            type = 'Class';
        }
        else if (typeof value === 'function')
            type = 'Function';
        else if (typeof value === 'object')
            type = 'Object';
        else
            type = 'Unknown';
        // check if need to get the "child" types
        const avoidTypes = [
            'Null',
            'Undefined',
            'String',
            'Integer',
            'Number',
            'Boolean',
            'Unknown'
        ];
        if (settings.of === true && !avoidTypes.includes(type)) {
            const loopOn = Array.isArray(value)
                ? [...value.keys()]
                : Object.keys(value);
            const receivedTypes = [];
            loopOn.forEach((valueIndex) => {
                const valueToCheck = value[valueIndex];
                const childType = typeOf(valueToCheck, {
                    of: false,
                    customClass: settings.customClass
                });
                if (!receivedTypes.includes(childType)) {
                    receivedTypes.push(childType);
                }
            });
            // save the "of" types in the result obj
            type += `<${receivedTypes.join('|')}>`;
        }
        return type;
    }
    exports.default = typeOf;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHlwZW9mLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLG9FQUE2QztJQUM3Qyw0REFBbUM7SUFDbkMsd0RBQW1DO0lBQ25DLHNFQUErQztJQU8vQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThDRztJQUNILFNBQVMsTUFBTSxDQUFDLEtBQVUsRUFBRSxXQUE0QixFQUFFO1FBQ3hELFFBQVEsR0FBRyxtQkFBVSxDQUNuQjtZQUNFLEVBQUUsRUFBRSxLQUFLO1lBQ1QsV0FBVyxFQUFFLElBQUk7U0FDbEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLG9CQUFvQjtRQUNwQixJQUFJLElBQVksQ0FBQztRQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQUUsSUFBSSxHQUFHLE9BQU8sQ0FBQzthQUNwQyxJQUFJLEtBQUssWUFBWSxHQUFHO1lBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUN2QyxJQUFJLEtBQUssS0FBSyxJQUFJO1lBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQzthQUNsQyxJQUFJLEtBQUssS0FBSyxTQUFTO1lBQUUsSUFBSSxHQUFHLFdBQVcsQ0FBQzthQUM1QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQy9DLElBQUksaUJBQU0sQ0FBQyxLQUFLLENBQUM7WUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDO2FBQ3BDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtZQUFFLElBQUksR0FBRyxRQUFRLENBQUM7YUFDL0MsSUFBSSxPQUFPLEtBQUssS0FBSyxTQUFTO1lBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQzthQUNqRCxJQUFJLEtBQUssWUFBWSxNQUFNO1lBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUM3QyxJQUNILFFBQVEsQ0FBQyxXQUFXLEtBQUssSUFBSTtZQUM3QixlQUFRLENBQUMsS0FBSyxDQUFDO1lBQ2YsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQ3hCO1lBQ0EsSUFBSSxHQUFHLG9CQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO2FBQU0sSUFDTCxRQUFRLENBQUMsV0FBVyxLQUFLLElBQUk7WUFDN0IsS0FBSyxDQUFDLFdBQVcsS0FBSyxTQUFTO1lBQy9CLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFDcEM7WUFDQSxJQUFJLEdBQUcsb0JBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVDO2FBQU0sSUFBSSxRQUFRLENBQUMsV0FBVyxLQUFLLEtBQUssSUFBSSxlQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUQsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUNoQjthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVTtZQUFFLElBQUksR0FBRyxVQUFVLENBQUM7YUFDckQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQUUsSUFBSSxHQUFHLFFBQVEsQ0FBQzs7WUFDL0MsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUV0Qix5Q0FBeUM7UUFDekMsTUFBTSxVQUFVLEdBQUc7WUFDakIsTUFBTTtZQUNOLFdBQVc7WUFDWCxRQUFRO1lBQ1IsU0FBUztZQUNULFFBQVE7WUFDUixTQUFTO1lBQ1QsU0FBUztTQUNWLENBQUM7UUFDRixJQUFJLFFBQVEsQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN0RCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sYUFBYSxHQUFhLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBZSxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxTQUFTLEdBQVcsTUFBTSxDQUFDLFlBQVksRUFBRTtvQkFDN0MsRUFBRSxFQUFFLEtBQUs7b0JBQ1QsV0FBVyxFQUFFLFFBQVEsQ0FBQyxXQUFXO2lCQUNsQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3RDLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCx3Q0FBd0M7WUFDeEMsSUFBSSxJQUFJLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1NBQ3hDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Qsa0JBQWUsTUFBTSxDQUFDIn0=