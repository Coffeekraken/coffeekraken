// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/class"], factory);
    }
})(function (require, exports) {
    "use strict";
    var class_1 = __importDefault(require("../is/class"));
    /**
     * @name            getExtendsStack
     * @namespace       sugar.js.class
     * @type            Function
     * @stable
     *
     * This function take a class as parameter and return an array of all the class names used to extends this one...
     *
     * @param       {Class}         cls         The class to get the stack of
     * @return      {Array}                     An array of all the parent classes names
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import getExtendsStack from '@coffeekraken/sugar/js/class/getExtendsStack';
     * class Coco extends Error {}
     * class Plop extends Coco {}
     * getExtendsStack(Plop); // => ['Coco','Error'];
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function getExtendsStack(cls) {
        var stack = [];
        if (!class_1.default(cls)) {
            cls = cls.constructor;
        }
        // if (cls instanceof Function) {
        var baseClass = cls;
        while (baseClass) {
            var newBaseClass = Object.getPrototypeOf(baseClass);
            if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
                stack.push(newBaseClass.name);
                baseClass = newBaseClass;
            }
            else {
                break;
            }
        }
        return stack;
    }
    return getExtendsStack;
});
//# sourceMappingURL=module.js.map