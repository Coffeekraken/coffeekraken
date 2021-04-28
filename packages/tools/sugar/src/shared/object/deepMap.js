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
     * @namespace            js.object
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
    function deepMap(objectOrArray, processor, settings = {}, _path = []) {
        settings = deepMerge_1.default({
            classInstances: false,
            array: true,
            privateProps: false,
            cloneFirst: true
        }, settings);
        const isArray = Array.isArray(objectOrArray);
        const newObject = isArray
            ? []
            : settings.cloneFirst
                ? Object.assign({}, objectOrArray)
                : objectOrArray;
        Object.keys(objectOrArray).forEach((prop) => {
            if (!settings.privateProps && prop.match(/^_/))
                return;
            if (plainObject_1.default(objectOrArray[prop]) ||
                (classInstance_1.default(objectOrArray[prop]) && settings.classInstances) ||
                (Array.isArray(objectOrArray[prop]) && settings.array)) {
                const res = deepMap(objectOrArray[prop], processor, settings, [
                    ..._path,
                    prop
                ]);
                if (isArray) {
                    newObject.push(res);
                }
                else {
                    newObject[prop] = res;
                }
                return;
            }
            const res = processor({
                object: objectOrArray,
                prop,
                value: objectOrArray[prop],
                path: [..._path, prop].join('.')
            });
            if (res === -1)
                return;
            if (isArray)
                newObject.push(res);
            else
                newObject[prop] = res;
        });
        return newObject;
    }
    exports.default = deepMap;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9zaGFyZWQvb2JqZWN0L2RlZXBNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsb0VBQWdEO0lBQ2hELG9FQUE4QztJQUM5Qyx3RUFBb0Q7SUFFcEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNkJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFO1FBQ2xFLFFBQVEsR0FBRyxtQkFBVyxDQUNwQjtZQUNFLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLEtBQUssRUFBRSxJQUFJO1lBQ1gsWUFBWSxFQUFFLEtBQUs7WUFDbkIsVUFBVSxFQUFFLElBQUk7U0FDakIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0MsTUFBTSxTQUFTLEdBQUcsT0FBTztZQUN2QixDQUFDLENBQUMsRUFBRTtZQUNKLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVTtnQkFDckIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUVsQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUFFLE9BQU87WUFFdkQsSUFDRSxxQkFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsQ0FBQyx1QkFBaUIsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsY0FBYyxDQUFDO2dCQUNuRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUN0RDtnQkFDQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUU7b0JBQzVELEdBQUcsS0FBSztvQkFDUixJQUFJO2lCQUNMLENBQUMsQ0FBQztnQkFFSCxJQUFJLE9BQU8sRUFBRTtvQkFDWCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNyQjtxQkFBTTtvQkFDTCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUN2QjtnQkFDRCxPQUFPO2FBQ1I7WUFFRCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUM7Z0JBQ3BCLE1BQU0sRUFBRSxhQUFhO2dCQUNyQixJQUFJO2dCQUNKLEtBQUssRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUMxQixJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ2pDLENBQUMsQ0FBQztZQUNILElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQ3ZCLElBQUksT0FBTztnQkFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFDNUIsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFDRCxrQkFBZSxPQUFPLENBQUMifQ==