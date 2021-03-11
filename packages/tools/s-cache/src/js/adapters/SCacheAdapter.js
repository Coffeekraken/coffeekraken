// @shared
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
        define(["require", "exports", "@coffeekraken/sugar/class/SClass", "@coffeekraken/sugar/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SClass_1 = __importDefault(require("@coffeekraken/sugar/class/SClass"));
    var deepMerge_1 = __importDefault(require("@coffeekraken/sugar/object/deepMerge"));
    var SCacheAdapter = /** @class */ (function (_super) {
        __extends(SCacheAdapter, _super);
        /**
         * @name                              constructor
         * @type                              Function
         *
         * Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.
         *
         * @param         {Object}          [settings={}]             An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SCacheAdapter(settings) {
            if (settings === void 0) { settings = {}; }
            return _super.call(this, deepMerge_1.default({
                cacheAdapter: {}
            }, settings)) || this;
        }
        SCacheAdapter.prototype.setCache = function (cache) {
            this.cache = cache;
        };
        return SCacheAdapter;
    }(SClass_1.default));
    exports.default = SCacheAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDYWNoZUFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDRFQUF3RDtJQUN4RCxtRkFBK0Q7SUE0RC9EO1FBQW9ELGlDQUFRO1FBSTFEOzs7Ozs7Ozs7V0FTRztRQUNILHVCQUFZLFFBQWE7WUFBYix5QkFBQSxFQUFBLGFBQWE7bUJBQ3ZCLGtCQUNFLG1CQUFXLENBQ1Q7Z0JBQ0UsWUFBWSxFQUFFLEVBQUU7YUFDakIsRUFDRCxRQUFRLENBQ1QsQ0FDRjtRQUNILENBQUM7UUFFRCxnQ0FBUSxHQUFSLFVBQVMsS0FBMEI7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQztRQXFGSCxvQkFBQztJQUFELENBQUMsQUFoSEQsQ0FBb0QsZ0JBQVEsR0FnSDNEIn0=