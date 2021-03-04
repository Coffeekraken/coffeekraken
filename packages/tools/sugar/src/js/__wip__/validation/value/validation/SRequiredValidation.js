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
        define(["require", "exports", "../../SValidation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SValidation_1 = __importDefault(require("../../SValidation"));
    /**
     * @name          SRequiredValidation
     * @namespace     sugar.js.validation.value.validation
     * @type          Class
     * @status              wip
     *
     * This class represent the "required" validation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SRequiredValidation = /** @class */ (function (_super) {
        __extends(SRequiredValidation, _super);
        function SRequiredValidation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SRequiredValidation.exec = function (value) {
            return value !== null && value !== undefined;
        };
        SRequiredValidation.message = 'This value is <yellow>required</yellow> and you\'ve passed "<red>%0"</red>';
        return SRequiredValidation;
    }(SValidation_1.default));
    exports.default = SRequiredValidation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1JlcXVpcmVkVmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNSZXF1aXJlZFZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGtFQUE4QztJQUU5Qzs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNIO1FBQWtDLHVDQUFhO1FBQS9DOztRQU1BLENBQUM7UUFIUSx3QkFBSSxHQUFYLFVBQVksS0FBSztZQUNmLE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDO1FBQy9DLENBQUM7UUFKTSwyQkFBTyxHQUNaLDRFQUE0RSxDQUFDO1FBSWpGLDBCQUFDO0tBQUEsQUFORCxDQUFrQyxxQkFBYSxHQU05QztJQUVELGtCQUFlLG1CQUFtQixDQUFDIn0=