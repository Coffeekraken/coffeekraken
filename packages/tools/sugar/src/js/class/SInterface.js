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
     * @name              SInterface
     * @namespace           sugar.js.class
     * @type              Function
     * @status              wip
     *
     * This class allows you to define an interface that you can later apply to an object instance
     * to make sure this particular instance has all the features, methods and properties you want.
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     * @todo      Enhance the interface validation for things like missing "type" property, etc...
     *
     * @example         js
     * import SInterface from '@coffeekraken/sugar/js/class/SInterface';
     * class MyCoolInterface extends SInterface {
     *    static definition = {
     *      title: {
     *        type: 'String',
     *        required: true
     *      },
     *      doSomething: {
     *        type: 'Function',
     *        required: true
     *      }
     *    }
     * }
     *
     * class MyClass {
     *    constructor() {
     *      MyCoolInterface.apply(this);
     *    }
     * }
     *
     * const myObject = new MyClass();
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    var SInterface = /** @class */ (function () {
        function SInterface() {
        }
        /**
         * @name              settings
         * @type              Object
         * @static
         *
         * Store the default settings that will be passed to the ```apply``` function
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.settings = {
            throw: true,
            return: 'String'
        };
        return SInterface;
    }());
    exports.default = SInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7O0lBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVDRztJQUNIO1FBQUE7UUFpY0EsQ0FBQztRQWhjQzs7Ozs7Ozs7O1dBU0c7UUFDSSxtQkFBUSxHQUFHO1lBQ2hCLEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLFFBQVE7U0FDakIsQ0FBQztRQW1iSixpQkFBQztLQUFBLEFBamNELElBaWNDO3NCQWpjb0IsVUFBVSJ9