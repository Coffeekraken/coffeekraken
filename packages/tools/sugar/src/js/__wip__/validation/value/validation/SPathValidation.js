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
        define(["require", "exports", "../../SValidation", "../../../is/path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SValidation_1 = __importDefault(require("../../SValidation"));
    var path_1 = __importDefault(require("../../../is/path"));
    /**
     * @name          SPathValidation
     * @namespace     sugar.js.validation.value.validation
     * @type          Class
     * @status              wip
     *
     * This class represent the "path" validation
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SPathValidation = /** @class */ (function (_super) {
        __extends(SPathValidation, _super);
        function SPathValidation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SPathValidation.exec = function (value, checkExistence) {
            if (checkExistence === void 0) { checkExistence = true; }
            return path_1.default(value);
        };
        SPathValidation.message = 'This value must be a valid <yellow>path</yellow> and you\'ve passed "<red>%0</red>"';
        return SPathValidation;
    }(SValidation_1.default));
    exports.default = SPathValidation;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1BhdGhWYWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1BhdGhWYWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrRUFBOEM7SUFDOUMsMERBQXdDO0lBR3hDOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0g7UUFBOEIsbUNBQWE7UUFBM0M7O1FBTUEsQ0FBQztRQUhRLG9CQUFJLEdBQVgsVUFBWSxLQUFLLEVBQUUsY0FBcUI7WUFBckIsK0JBQUEsRUFBQSxxQkFBcUI7WUFDdEMsT0FBTyxjQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUpNLHVCQUFPLEdBQ1oscUZBQXFGLENBQUM7UUFJMUYsc0JBQUM7S0FBQSxBQU5ELENBQThCLHFCQUFhLEdBTTFDO0lBRUQsa0JBQWUsZUFBZSxDQUFDIn0=