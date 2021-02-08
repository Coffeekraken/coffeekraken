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
        define(["require", "exports", "../../string/toString", "../../string/parse", "../../object/deepMerge", "./SConfigAdapter", "../../object/diff"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var toString_1 = __importDefault(require("../../string/toString"));
    var parse_1 = __importDefault(require("../../string/parse"));
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SConfigAdapter_1 = __importDefault(require("./SConfigAdapter"));
    var diff_1 = __importDefault(require("../../object/diff"));
    /**
     * @name                  SConfigLsAdapter
     * @namespace           sugar.js.config.adapters
     * @type                  Class
     *
     * This Local Storage adapter for the SConfig class let you define a name for your config and then you can just
     * let the SConfig class do the work for you...
     *
     * @param                   {Object}                    [settings={}]         The adapter settings that let you work with the good data storage solution...
     * - name (null) {String}: This specify the config name that you want to use.
     * - defaultConfig ({}) {Object}: This specify the "default" config that you want.
     * - appConfig ({}) {Object}: This specify the "application" level config that you want.
     * - userConfig ({}) {Object}: This specify the "user" level config that you want. It's usually this config that is updated
     * @return                  {Promise}                                         A promise that will be resolved once the data has been getted/saved...
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    module.exports = /** @class */ (function (_super) {
        __extends(SConfigLsAdapter, _super);
        function SConfigLsAdapter(settings) {
            if (settings === void 0) { settings = {}; }
            return _super.call(this, settings) || this;
        }
        SConfigLsAdapter.prototype.load = function () {
            // try to get the config from the localstorage
            var config = parse_1.default(localStorage.getItem(this._settings.name)) || {};
            // mix the configs and save them in the instance
            return deepMerge_1.default(config.default || {}, config.app || {}, config.user || {});
        };
        SConfigLsAdapter.prototype.save = function (newConfig) {
            if (newConfig === void 0) { newConfig = {}; }
            var baseConfig = deepMerge_1.default(this._settings.defaultConfig, this._settings.appConfig);
            localStorage.setItem(this._settings.name, toString_1.default({
                default: this._settings.defaultConfig,
                app: this._settings.appConfig,
                user: diff_1.default(baseConfig, newConfig)
            }));
            return true;
        };
        return SConfigLsAdapter;
    }((SConfigAdapter_1.default)));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0xzQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDb25maWdMc0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlkLG1FQUErQztJQUMvQyw2REFBeUM7SUFFekMscUVBQWlEO0lBQ2pELG9FQUFnRDtJQUNoRCwyREFBdUM7SUFFdkM7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFFSCxNQUFNLENBQUMsT0FBTztRQUFrQyxvQ0FFL0M7UUFDQywwQkFBWSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO21CQUN2QixrQkFBTSxRQUFRLENBQUM7UUFDakIsQ0FBQztRQUVELCtCQUFJLEdBQUo7WUFDRSw4Q0FBOEM7WUFDOUMsSUFBTSxNQUFNLEdBQUcsZUFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV4RSxnREFBZ0Q7WUFDaEQsT0FBTyxtQkFBVyxDQUNoQixNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFDcEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQ2hCLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUNsQixDQUFDO1FBQ0osQ0FBQztRQUVELCtCQUFJLEdBQUosVUFBSyxTQUFjO1lBQWQsMEJBQUEsRUFBQSxjQUFjO1lBQ2pCLElBQU0sVUFBVSxHQUFHLG1CQUFXLENBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FDekIsQ0FBQztZQUNGLFlBQVksQ0FBQyxPQUFPLENBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUNuQixrQkFBVSxDQUFDO2dCQUNULE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWE7Z0JBQ3JDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7Z0JBQzdCLElBQUksRUFBRSxjQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQzthQUNwQyxDQUFDLENBQ0gsQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNILHVCQUFDO0lBQUQsQ0FBQyxBQWxDZ0IsQ0FBK0IsQ0FDOUMsd0JBQWdCLENBQ2pCLEVBZ0NBLENBQUMifQ==