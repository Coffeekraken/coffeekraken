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
        define(["require", "exports", "../is/plainObject", "../object/deepMerge", "../is/classInstance"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const plainObject_1 = __importDefault(require("../is/plainObject"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const classInstance_1 = __importDefault(require("../is/classInstance"));
    /**
     * @name            deepMap
     * @namespace           sugar.js.object
     * @type            Function
     * @stable
     *
     * This function is the same as the "map" one. The only difference is that this one goes deep into the object
     *
     * @param         {Object}        object          The object you want to map through
     * @param         {Function}      processor       The processor function that take as parameter the actual property value, the current property name and the full dotted path to the current property
     * @param         {Object}        [settings={}]     An object of settings to configure your deepMap process:
     * - classInstances (false) {Boolean}: Specify if you want the objects to be processed the same as other values
     * - deepFirst (true) {Boolean}: Specify if you want to process deep values first
     * - array (true) {Boolean}: Specify if we have to treat array like simple value to process of treat them as an object and continue our map down
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import deepMap from '@coffeekraken/sugar/js/object/deepMap';
     * deepMap({
     *    hello: 'world'
     * }, ({object, prop, value, path}) => {
     *    return '~ ' + value;
     * });
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function deepMap(object, processor, settings = {}, _path = []) {
        settings = deepMerge_1.default({
            deepFirst: false,
            classInstances: false,
            array: true,
            privateProps: false,
            cloneFirst: true
        }, settings);
        if (settings.cloneFirst) {
            object = Object.assign({}, object);
        }
        Object.keys(object).forEach((prop) => {
            if (!settings.privateProps && prop.match(/^_/)) {
                delete object[prop];
                return;
            }
            // const descriptor = Object.getOwnPropertyDescriptor(object, prop);
            // if (
            //   descriptor.get &&
            //   typeof descriptor.get === 'function' &&
            //   !descriptor.set
            // ) {
            //   return;
            // }
            if (!settings.deepFirst) {
                if (plainObject_1.default(object[prop]) ||
                    (classInstance_1.default(object[prop]) && settings.classInstances) ||
                    (Array.isArray(object[prop]) && settings.array)) {
                    object[prop] = deepMap(object[prop], processor, settings, [
                        ..._path,
                        prop
                    ]);
                    // if (!settings.classInstances) return;
                }
                const res = processor({
                    object,
                    prop,
                    value: object[prop],
                    path: [..._path, prop].join('.')
                });
                if (res === -1)
                    delete object[prop];
                else
                    object[prop] = res;
            }
            else {
                const res = processor({
                    object,
                    prop,
                    value: object[prop],
                    path: [..._path, prop].join('.')
                });
                if (res === -1)
                    delete object[prop];
                else
                    object[prop] = res;
                if (plainObject_1.default(object[prop]) ||
                    (classInstance_1.default(object[prop]) && settings.classInstances) ||
                    (Array.isArray(object[prop]) && settings.array)) {
                    object[prop] = deepMap(object[prop], processor, settings, [
                        ..._path,
                        prop
                    ]);
                    // if (!settings.classInstances) return;
                }
            }
        });
        return object;
    }
    exports.default = deepMap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0VBQWdEO0lBQ2hELG9FQUE4QztJQUM5Qyx3RUFBb0Q7SUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFO1FBQzNELFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLEtBQUssRUFBRSxJQUFJO1lBQ1gsWUFBWSxFQUFFLEtBQUs7WUFDbkIsVUFBVSxFQUFFLElBQUk7U0FDakIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUN2QixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixPQUFPO2FBQ1I7WUFFRCxvRUFBb0U7WUFDcEUsT0FBTztZQUNQLHNCQUFzQjtZQUN0Qiw0Q0FBNEM7WUFDNUMsb0JBQW9CO1lBQ3BCLE1BQU07WUFDTixZQUFZO1lBQ1osSUFBSTtZQUVKLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO2dCQUN2QixJQUNFLHFCQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM3QixDQUFDLHVCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUM7b0JBQzVELENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQy9DO29CQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7d0JBQ3hELEdBQUcsS0FBSzt3QkFDUixJQUFJO3FCQUNMLENBQUMsQ0FBQztvQkFDSCx3Q0FBd0M7aUJBQ3pDO2dCQUVELE1BQU0sR0FBRyxHQUFHLFNBQVMsQ0FBQztvQkFDcEIsTUFBTTtvQkFDTixJQUFJO29CQUNKLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNuQixJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNqQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztvQkFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7b0JBQ3BCLE1BQU07b0JBQ04sSUFBSTtvQkFDSixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDbkIsSUFBSSxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDakMsQ0FBQyxDQUFDO2dCQUNILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztvQkFBRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7b0JBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQ0UscUJBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdCLENBQUMsdUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQztvQkFDNUQsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFDL0M7b0JBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRTt3QkFDeEQsR0FBRyxLQUFLO3dCQUNSLElBQUk7cUJBQ0wsQ0FBQyxDQUFDO29CQUNILHdDQUF3QztpQkFDekM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFlLE9BQU8sQ0FBQyJ9