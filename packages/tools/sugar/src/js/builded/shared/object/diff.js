// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/plainObject", "is-equal"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var plainObject_1 = __importDefault(require("../is/plainObject"));
    var is_equal_1 = __importDefault(require("is-equal"));
    /**
     * @name                      diff
     * @namespace           sugar.js.object
     * @type                      Function
     * @status              beta
     *
     * This function take two objects and return an object that contains only what has been changed between the two.
     * This function is a simple wrapper around the nice object-diff package from Thomas Jensen that you can find here: https://www.npmjs.com/package/object-diff
     *
     * @param         {Object}          object1            The first object used for the diff process
     * @param         {Object}          object2            The second object used for the diff process
     * @param         {Object}          [settings={}]      An object of settings to configure the diff process:
     * - deep (true) {Boolean}: Specify if you want a deep diff or a simple one level diff
     * - added (true) {Boolean}: Specify if you want to include the props that does not exist on the object1 but exists on the object2
     * - deleted (false) {Boolean}: Specify if you want to include the props that exists on the object1 but no more on the object2
     * - equals (false) {Boolean}: Specify if you want to include the props that are equals from the object1 to the object2
     * - emptyObject (false) {Boolean}: Specify if you want to keep the empty objects in the resulting one
     * - updated (true) {Boolean}: Specify if you want to include the updated values
     * @return        {Object}                             The object that contains only the differences between the two
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import diff from '@coffeekraken/sugar/js/object/diff';
     * const myObject1 = {
     *    hello: 'world',
     *    plop: 'yop'
     * };
     * const myObject2 = {
     *    coco: 'plop',
     *    hello: 'hey!',
     *    plop: 'yop'
     * };
     * diff(myObject1, myObject2);
     * {
     *    coco: 'plop',
     *    hello: 'hey!'
     * }
     *
     * @see       https://www.npmjs.com/package/is-equal
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function diff(object1, object2, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ deep: true, added: true, deleted: false, equals: false, emptyObject: false, updated: true }, settings);
        var finalObj = {};
        var keys = Array.from(new Set(__spreadArray(__spreadArray([], Object.keys(object1)), Object.keys(object2))));
        for (var i = 0; i < keys.length; i++) {
            var _prop = keys[i];
            if (settings.deep) {
                if (plainObject_1.default(object1[_prop]) && plainObject_1.default(object2[_prop])) {
                    finalObj[_prop] = diff(object1[_prop], object2[_prop], settings);
                    if (Object.keys(finalObj[_prop]).length === 0)
                        delete finalObj[_prop];
                    continue;
                }
            }
            if (settings.added) {
                if (object1[_prop] === undefined && object2[_prop] !== undefined) {
                    finalObj[_prop] = object2[_prop];
                    continue;
                }
            }
            if (settings.deleted) {
                if (object1[_prop] !== undefined && object2[_prop] === undefined) {
                    // delete object1[_prop];
                    finalObj[_prop] = object1[_prop];
                    continue;
                }
            }
            if (settings.equals) {
                if (is_equal_1.default(object1[_prop], object2[_prop])) {
                    finalObj[_prop] = object2[_prop];
                    continue;
                }
            }
            if (settings.emptyObject) {
                if (plainObject_1.default(object1[_prop]) &&
                    Object.keys(object1[_prop]).length === 0) {
                    finalObj[_prop] = {};
                    continue;
                }
            }
            if (settings.updated) {
                if (object1[_prop] === undefined || object2[_prop] === undefined) {
                    continue;
                }
                if (!is_equal_1.default(object1[_prop], object2[_prop])) {
                    finalObj[_prop] = object2[_prop];
                    continue;
                }
            }
        }
        return finalObj;
    }
    exports.default = diff;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9vYmplY3QvZGlmZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLGtFQUFnRDtJQUNoRCxzREFBaUM7SUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNENHO0lBQ0gsU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFhO1FBQWIseUJBQUEsRUFBQSxhQUFhO1FBQzNDLFFBQVEsY0FDTixJQUFJLEVBQUUsSUFBSSxFQUNWLEtBQUssRUFBRSxJQUFJLEVBQ1gsT0FBTyxFQUFFLEtBQUssRUFDZCxNQUFNLEVBQUUsS0FBSyxFQUNiLFdBQVcsRUFBRSxLQUFLLEVBQ2xCLE9BQU8sRUFBRSxJQUFJLElBQ1YsUUFBUSxDQUNaLENBQUM7UUFFRixJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFFcEIsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FDckIsSUFBSSxHQUFHLGlDQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUM1RCxDQUFDO1FBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXRCLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDakIsSUFBSSxxQkFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLHFCQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ3RFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDakUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO3dCQUFFLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RSxTQUFTO2lCQUNWO2FBQ0Y7WUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUNoRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqQyxTQUFTO2lCQUNWO2FBQ0Y7WUFFRCxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxFQUFFO29CQUNoRSx5QkFBeUI7b0JBQ3pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLFNBQVM7aUJBQ1Y7YUFDRjtZQUVELElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDbkIsSUFBSSxrQkFBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDN0MsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakMsU0FBUztpQkFDVjthQUNGO1lBRUQsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO2dCQUN4QixJQUNFLHFCQUFlLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQ3hDO29CQUNBLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ3JCLFNBQVM7aUJBQ1Y7YUFDRjtZQUVELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ2hFLFNBQVM7aUJBQ1Y7Z0JBQ0QsSUFBSSxDQUFDLGtCQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUM5QyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqQyxTQUFTO2lCQUNWO2FBQ0Y7U0FDRjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxrQkFBZSxJQUFJLENBQUMifQ==