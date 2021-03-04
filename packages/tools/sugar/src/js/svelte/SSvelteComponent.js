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
        define(["require", "exports", "../class/SClass", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SClass_1 = __importDefault(require("../class/SClass"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SSVelteComponent = /** @class */ (function (_super) {
        __extends(SSVelteComponent, _super);
        function SSVelteComponent(settings) {
            var _this = _super.call(this, deepMerge_1.default({
                svelteComponent: {}
            }, settings || {})) || this;
            console.log('Hello');
            return _this;
        }
        return SSVelteComponent;
    }(SClass_1.default));
    exports.default = SSVelteComponent;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N2ZWx0ZUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdmVsdGVDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsMkRBQXVDO0lBQ3ZDLGtFQUE4QztJQVM5QztRQUErQixvQ0FBUTtRQUNyQywwQkFBWSxRQUFpRDtZQUE3RCxZQUNFLGtCQUNFLG1CQUFXLENBQ1Q7Z0JBQ0UsZUFBZSxFQUFFLEVBQUU7YUFDcEIsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsU0FFRjtZQURDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBQ3ZCLENBQUM7UUFDSCx1QkFBQztJQUFELENBQUMsQUFaRCxDQUErQixnQkFBUSxHQVl0QztJQUVELGtCQUFlLGdCQUFnQixDQUFDIn0=