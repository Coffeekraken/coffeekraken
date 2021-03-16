// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        define(["require", "exports", "@coffeekraken/sugar/js/class/SClass", "@coffeekraken/sugar/js/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SClass_1 = __importDefault(require("@coffeekraken/sugar/js/class/SClass"));
    var deepMerge_1 = __importDefault(require("@coffeekraken/sugar/js/object/deepMerge"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDYWNoZUFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsK0VBQTJEO0lBQzNELHNGQUFrRTtJQTREbEU7UUFBb0QsaUNBQVE7UUFJMUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsdUJBQVksUUFBYTtZQUFiLHlCQUFBLEVBQUEsYUFBYTttQkFDdkIsa0JBQ0UsbUJBQVcsQ0FDVDtnQkFDRSxZQUFZLEVBQUUsRUFBRTthQUNqQixFQUNELFFBQVEsQ0FDVCxDQUNGO1FBQ0gsQ0FBQztRQUVELGdDQUFRLEdBQVIsVUFBUyxLQUEwQjtZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBcUZILG9CQUFDO0lBQUQsQ0FBQyxBQWhIRCxDQUFvRCxnQkFBUSxHQWdIM0QifQ==