var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./deepMap", "./set"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMap_1 = __importDefault(require("./deepMap"));
    const set_1 = __importDefault(require("./set"));
    /**
     * @name                toJson
     * @namespace            shared.object
     * @type                Function
     *
     * Convert class instances to plain JSON object
     *
     * @param       {Any}           object      The object to convert
     * @return      {Any}                       The converted object
     *
     * @example         js
     * import toJson from '@coffeekraken/sugar/shared/object/toJson';
     * class MyClass {
     *      hello = 'world';
     *      something() {}
     * }
     * toJson(new MyClass()); // => { hello: 'world' }
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function toJson(object) {
        const newObj = {};
        deepMap_1.default(object, ({ value, path }) => {
            set_1.default(newObj, path, value);
            return value;
        }, {
            privateProps: false,
            classInstances: true
        });
        return newObj;
    }
    exports.default = toJson;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9Kc29uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9Kc29uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsd0RBQWtDO0lBQ2xDLGdEQUEwQjtJQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxTQUF3QixNQUFNLENBQUMsTUFBVztRQUN4QyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsaUJBQVMsQ0FDUCxNQUFNLEVBQ04sQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2xCLGFBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUNEO1lBQ0UsWUFBWSxFQUFFLEtBQUs7WUFDbkIsY0FBYyxFQUFFLElBQUk7U0FDckIsQ0FDRixDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWRELHlCQWNDIn0=