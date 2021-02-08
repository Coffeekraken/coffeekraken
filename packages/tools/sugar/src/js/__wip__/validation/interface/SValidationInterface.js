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
    var _a;
    var SInterface_1 = __importDefault(require("../../class/SInterface"));
    return (_a = /** @class */ (function (_super) {
            __extends(SValidationInterface, _super);
            function SValidationInterface() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return SValidationInterface;
        }(SInterface_1.default)),
        _a.definition = {
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
        },
        _a);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZhbGlkYXRpb25JbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmFsaWRhdGlvbkludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsc0VBQWtEO0lBY2xEO1lBQTRDLHdDQUFZO1lBQS9DOztZQWlCVCxDQUFDO1lBQUQsMkJBQUM7UUFBRCxDQUFDLEFBakJRLENBQW1DLG9CQUFZO1FBQy9DLGFBQVUsR0FBRztZQUNsQixLQUFLLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFdBQVcsRUFDVCx5RUFBeUU7Z0JBQzNFLE1BQU0sRUFBRSxJQUFJO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLFdBQVcsRUFDVCw0SUFBNEk7Z0JBQzlJLE1BQU0sRUFBRSxJQUFJO2FBQ2I7U0FDRDtZQUNGIn0=