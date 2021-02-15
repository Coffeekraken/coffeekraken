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
     * @name          SValuesValidation
     * @namespace     sugar.js.validation.value.validation
     * @type          Class
     * @status              wip
     *
     * This class represent the "values" validation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SValuesValidation = /** @class */ (function (_super) {
        __extends(SValuesValidation, _super);
        function SValuesValidation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SValuesValidation.exec = function (value, values) {
            return values.indexOf(value) !== -1;
        };
        SValuesValidation.message = 'This value must be one of these "<green>%1</green>" but you\'ve passed "<red>%0</red>"';
        return SValuesValidation;
    }(SValidation_1.default));
    exports.default = SValuesValidation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZhbHVlc1ZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmFsdWVzVmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsa0VBQThDO0lBRzlDOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0g7UUFBZ0MscUNBQWE7UUFBN0M7O1FBTUEsQ0FBQztRQUhRLHNCQUFJLEdBQVgsVUFBWSxLQUFLLEVBQUUsTUFBTTtZQUN2QixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUpNLHlCQUFPLEdBQ1osd0ZBQXdGLENBQUM7UUFJN0Ysd0JBQUM7S0FBQSxBQU5ELENBQWdDLHFCQUFhLEdBTTVDO0lBRUQsa0JBQWUsaUJBQWlCLENBQUMifQ==