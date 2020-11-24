// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SDescriptor_1 = __importDefault(require("../SDescriptor"));
    /**
     * @name              SObjectDescriptor
     * @namespace           sugar.js.descriptor.object
     * @type              Class
     *
     * This class allows you to describe an object by setting some "rules" like the type you want for a property,
     * the default value you want, etc...
     *
     * @example         js
     * import SObjectDescriptor from '@coffeekraken/sugar/js/descriptor/object/SObjectDescriptor';
     * class MyCoolDescriptor extends SObjectDescriptor {
     *    static description = {
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
     *      MyCoolDescriptor.apply(this);
     *    }
     * }
     *
     * const myObject = new MyClass();
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    var Cls = /** @class */ (function (_super) {
        __extends(SObjectDescriptor, _super);
        function SObjectDescriptor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SObjectDescriptor;
    }(SDescriptor_1.default));
    return Cls;
});
