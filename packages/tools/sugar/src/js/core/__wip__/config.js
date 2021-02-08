// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/base64", "../crypt/base64", "../object/deepMerge", "../object/get", "../object/set", "../is/json"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var base64_1 = __importDefault(require("../is/base64"));
    var base64_2 = __importDefault(require("../crypt/base64"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var get_1 = __importDefault(require("../object/get"));
    var set_1 = __importDefault(require("../object/set"));
    var json_1 = __importDefault(require("../is/json"));
    /**
     * @name                          config
     * @namespace           js.core
     * @namespace                     Function
     *
     * Access the configuration setted using the "config(path, value)" function
     *
     * @param               {String}                  path                        The dotted config path to get like "log.mail"
     * @param               {Mixed}                   [value=null]                The value to set. Will return the setted value if passed
     * @return              {Mixed}                                               Return the config value wanted
     *
     * @example           js
     * import config from '@coffeekraken/sugar/js/core/js';
     * config('log.mail.host'); // => gmail.google.com
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
     */
    var __sugarConfig = window.sConfig || localStorage.getItem('sConfig') || {};
    // if (typeof __sugarConfig === 'string' && __isBase64(__sugarConfig)) __sugarConfig = __base64.decrypt(__sugarConfig);
    // if (typeof __sugarConfig === 'string' && __isJson(__sugarConfig)) __sugarConfig = JSON.parse(__sugarConfig);
    exports.default = (function (path, value) {
        if (value === void 0) { value = null; }
        // process the path
        if (path === '.' || path === '' || !path) {
            path = '';
        }
        if (base64_1.default(value)) {
            value = base64_2.default.decrypt(value);
        }
        if (json_1.default(value)) {
            value = JSON.parse(value);
        }
        if (typeof value === 'object' && (path === '.' || path === '' || !path)) {
            __sugarConfig = deepMerge_1.default(__sugarConfig, value);
            return __sugarConfig;
        }
        var newValue;
        // check if is a set or get process
        if (value) {
            newValue = set_1.default(__sugarConfig, path, value);
        }
        else {
            // get the wanted path
            newValue = get_1.default(__sugarConfig, path);
        }
        // preparing the value to set in the storage
        var configToSave = __sugarConfig;
        if (typeof configToSave !== 'string')
            configToSave = JSON.stringify(configToSave);
        var encryptedConfig = base64_2.default.encrypt(configToSave);
        // save the new settings
        window.sConfig = encryptedConfig;
        localStorage.setItem('sConfig', encryptedConfig);
        // return the new settings value
        return newValue;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdEQUFzQztJQUN0QywyREFBdUM7SUFDdkMsa0VBQThDO0lBRTlDLHNEQUFrQztJQUNsQyxzREFBa0M7SUFDbEMsb0RBQWtDO0lBRWxDOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM1RSx1SEFBdUg7SUFDdkgsK0dBQStHO0lBQy9HLG1CQUFlLFVBQUMsSUFBSSxFQUFFLEtBQVk7UUFBWixzQkFBQSxFQUFBLFlBQVk7UUFDaEMsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ3hDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksZ0JBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixLQUFLLEdBQUcsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakM7UUFDRCxJQUFJLGNBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtRQUVELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkUsYUFBYSxHQUFHLG1CQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xELE9BQU8sYUFBYSxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxRQUFRLENBQUM7UUFFYixtQ0FBbUM7UUFDbkMsSUFBSSxLQUFLLEVBQUU7WUFDVCxRQUFRLEdBQUcsYUFBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDOUM7YUFBTTtZQUNMLHNCQUFzQjtZQUN0QixRQUFRLEdBQUcsYUFBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUVELDRDQUE0QztRQUM1QyxJQUFJLFlBQVksR0FBRyxhQUFhLENBQUM7UUFDakMsSUFBSSxPQUFPLFlBQVksS0FBSyxRQUFRO1lBQ2xDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLElBQU0sZUFBZSxHQUFHLGdCQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZELHdCQUF3QjtRQUN4QixNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUNqQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUVqRCxnQ0FBZ0M7UUFDaEMsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQyxFQUFDIn0=