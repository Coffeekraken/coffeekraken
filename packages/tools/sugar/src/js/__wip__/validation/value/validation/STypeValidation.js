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
        define(["require", "exports", "../../SValidation", "../../../is/ofType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SValidation_1 = __importDefault(require("../../SValidation"));
    var ofType_1 = __importDefault(require("../../../is/ofType"));
    /**
     * @name          STypeValidation
     * @namespace     sugar.js.validation.value.validation
     * @type          Class
     * @status              wip
     *
     * This class represent the "type" validation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var STypeValidation = /** @class */ (function (_super) {
        __extends(STypeValidation, _super);
        function STypeValidation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        STypeValidation.exec = function (value, type) {
            var result = ofType_1.default(value, type);
            if (result === true)
                return true;
            return [value, type, result.received.type];
        };
        STypeValidation.message = 'This value has to be of type "<yellow>%1</yellow>" and you\'ve passed "<red>%0</red>" which is of type "<red>%2</red>"';
        return STypeValidation;
    }(SValidation_1.default));
    exports.default = STypeValidation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1R5cGVWYWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1R5cGVWYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrRUFBOEM7SUFDOUMsOERBQTRDO0lBRTVDOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0g7UUFBOEIsbUNBQWE7UUFBM0M7O1FBUUEsQ0FBQztRQUxRLG9CQUFJLEdBQVgsVUFBWSxLQUFLLEVBQUUsSUFBSTtZQUNyQixJQUFNLE1BQU0sR0FBRyxnQkFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJLE1BQU0sS0FBSyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsQ0FBQztRQU5NLHVCQUFPLEdBQ1osd0hBQXdILENBQUM7UUFNN0gsc0JBQUM7S0FBQSxBQVJELENBQThCLHFCQUFhLEdBUTFDO0lBRUQsa0JBQWUsZUFBZSxDQUFDIn0=