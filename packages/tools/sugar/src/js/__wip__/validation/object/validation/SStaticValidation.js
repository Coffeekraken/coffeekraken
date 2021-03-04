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
    Object.defineProperty(exports, "__esModule", { value: true });
    var SValidation_1 = __importDefault(require("../../SValidation"));
    var class_1 = __importDefault(require("../../../is/class"));
    /**
     * @name          SStaticValidation
     * @namespace     sugar.js.validation.value.validation
     * @type          Class
     * @status              wip
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
            if (class_1.default(object)) {
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
    exports.default = SStaticValidation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0YXRpY1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RhdGljVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsa0VBQThDO0lBQzlDLDREQUEwQztJQUUxQzs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNIO1FBQWdDLHFDQUFhO1FBQTdDOztRQWFBLENBQUM7UUFWUSxzQkFBSSxHQUFYLFVBQVksS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRO1lBQ2pDLElBQUksZUFBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDcEMsT0FBTyxJQUFJLENBQUM7YUFDYjtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDaEQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFYTSx5QkFBTyxHQUNaLGlGQUFpRixDQUFDO1FBV3RGLHdCQUFDO0tBQUEsQUFiRCxDQUFnQyxxQkFBYSxHQWE1QztJQUVELGtCQUFlLGlCQUFpQixDQUFDIn0=