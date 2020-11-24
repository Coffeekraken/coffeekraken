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
        define(["require", "exports", "../../SValidation", "../../../is/class"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SValidation_1 = __importDefault(require("../../SValidation"));
    var class_2 = __importDefault(require("../../../is/class"));
    /**
     * @name          SStaticValidation
     * @namespace     sugar.js.validation.value.validation
     * @type          Class
     * @wip
     *
     * This class represent the "static" validation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SStaticValidation = /** @class */ (function (_super) {
        __extends(SStaticValidation, _super);
        function SStaticValidation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SStaticValidation.exec = function (value, object, property) {
            if (class_2.default(object)) {
                if (!object[property])
                    return false;
                return true;
            }
            else if (object.constructor) {
                if (!object.constructor[property])
                    return false;
                return true;
            }
            return [value, object, property];
        };
        SStaticValidation.message = 'The passed "<yellow>%2</yellow>" property has to be a <green>static</green> one';
        return SStaticValidation;
    }(SValidation_1.default));
    return SStaticValidation;
});
