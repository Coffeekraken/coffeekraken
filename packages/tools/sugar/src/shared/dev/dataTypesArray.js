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
        define(["require", "exports", "../is/node"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const node_1 = __importDefault(require("../is/node"));
    /**
     * @name                    dataTypesArray
     * @namespace           sugar.js.dev
     * @type                    Array
     * @status              wip
     *
     * This is just a list of data types available in the
     * current language (node/js)
     *
     * @todo        interface
     * @todo        doc
     * @todo        move this into more appropriate folder
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    if (node_1.default()) {
        export default [
            'Number',
            'String',
            'Symbol',
            'Boolean',
            'Null',
            'Undefined',
            'Object',
            'Array',
            'JSON',
            'Function'
        ];
    }
    else {
        export default [
            'Number',
            'String',
            'Symbol',
            'Boolean',
            'Null',
            'Undefined',
            'Object',
            'Array',
            'JSON',
            'Function'
        ];
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVR5cGVzQXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhVHlwZXNBcnJheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxzREFBa0M7SUFFbEM7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsSUFBSSxjQUFRLEVBQUUsRUFBRTtRQUNkLGVBQWU7WUFDYixRQUFRO1lBQ1IsUUFBUTtZQUNSLFFBQVE7WUFDUixTQUFTO1lBQ1QsTUFBTTtZQUNOLFdBQVc7WUFDWCxRQUFRO1lBQ1IsT0FBTztZQUNQLE1BQU07WUFDTixVQUFVO1NBQ1gsQ0FBQztLQUNIO1NBQU07UUFDTCxlQUFlO1lBQ2IsUUFBUTtZQUNSLFFBQVE7WUFDUixRQUFRO1lBQ1IsU0FBUztZQUNULE1BQU07WUFDTixXQUFXO1lBQ1gsUUFBUTtZQUNSLE9BQU87WUFDUCxNQUFNO1lBQ04sVUFBVTtTQUNYLENBQUM7S0FDSCJ9