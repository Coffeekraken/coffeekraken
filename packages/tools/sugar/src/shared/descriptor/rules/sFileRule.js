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
        define(["require", "exports", "../_SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
    const ruleObj = {
        name: 'Required',
        id: 'required',
        settings: {
            when: [undefined, null]
        },
        message: 'This value is required',
        processParams: (params) => {
            return { value: params };
        },
        apply: (value, params, ruleSettings, settings) => {
            if (params.value === true) {
                if (ruleSettings.when.indexOf(value) !== -1) {
                    return false;
                }
            }
            return true;
        }
    };
    // register the new rule
    _SDescriptor_1.default.registerRule(ruleObj);
    exports.default = ruleObj;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0ZpbGVSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic0ZpbGVSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUdkLG1FQUd5QjtJQW9CekIsTUFBTSxPQUFPLEdBQXFCO1FBQ2hDLElBQUksRUFBRSxVQUFVO1FBQ2hCLEVBQUUsRUFBRSxVQUFVO1FBQ2QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztTQUN4QjtRQUNELE9BQU8sRUFBRSx3QkFBd0I7UUFDakMsYUFBYSxFQUFFLENBQUMsTUFBZSxFQUFFLEVBQUU7WUFDakMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsS0FBSyxFQUFFLENBQ0wsS0FBVSxFQUNWLE1BQW1CLEVBQ25CLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0EsRUFBRTtZQUNoQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUN6QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUMzQyxPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztJQUVGLHdCQUF3QjtJQUN4QixzQkFBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsQyxrQkFBZSxPQUFPLENBQUMifQ==