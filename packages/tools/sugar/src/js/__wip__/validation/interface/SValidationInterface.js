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
        define(["require", "exports", "../../class/SInterface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SInterface_1 = __importDefault(require("../../class/SInterface"));
    /**
     * @name                SValidationInterface
     * @namespace           sugar.js.validation.interface
     * @type                Class
     * @extends             SInterface
     *
     * This class represent the interface that describe the minimum requirements
     * for a validation class that extends the SValueValidation one
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SValidationInterface = /** @class */ (function (_super) {
        __extends(SValidationInterface, _super);
        function SValidationInterface() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SValidationInterface.definition = {
            apply: {
                type: 'Function',
                required: true,
                description: 'This is the method that must be used when you want to validate a value.',
                static: true
            },
            exec: {
                type: 'Function',
                required: true,
                description: 'This is the method that will be called to validate the passed value. This method has to return true of false depending on the check result',
                static: true
            }
        };
        return SValidationInterface;
    }(SInterface_1.default));
    exports.default = SValidationInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZhbGlkYXRpb25JbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmFsaWRhdGlvbkludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0VBQWtEO0lBRWxEOzs7Ozs7Ozs7OztPQVdHO0lBQ0g7UUFBa0Qsd0NBQVk7UUFBOUQ7O1FBaUJBLENBQUM7UUFoQlEsK0JBQVUsR0FBRztZQUNsQixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFdBQVcsRUFDVCx5RUFBeUU7Z0JBQzNFLE1BQU0sRUFBRSxJQUFJO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFdBQVcsRUFDVCw0SUFBNEk7Z0JBQzlJLE1BQU0sRUFBRSxJQUFJO2FBQ2I7U0FDRixDQUFDO1FBQ0osMkJBQUM7S0FBQSxBQWpCRCxDQUFrRCxvQkFBWSxHQWlCN0Q7c0JBakJvQixvQkFBb0IifQ==