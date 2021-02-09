// @ts-nocheck
// @shared
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
    var _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
    var ruleObj = {
        name: 'Required',
        id: 'required',
        settings: {
            when: [undefined, null]
        },
        message: 'This value is required',
        processParams: function (params) {
            return { value: params };
        },
        apply: function (value, params, ruleSettings, settings) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWlyZWRSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVxdWlyZWRSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFPVixpRUFBMEM7SUFvQjFDLElBQU0sT0FBTyxHQUFxQjtRQUNoQyxJQUFJLEVBQUUsVUFBVTtRQUNoQixFQUFFLEVBQUUsVUFBVTtRQUNkLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7U0FDeEI7UUFDRCxPQUFPLEVBQUUsd0JBQXdCO1FBQ2pDLGFBQWEsRUFBRSxVQUFDLE1BQWU7WUFDN0IsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsS0FBSyxFQUFFLFVBQ0wsS0FBVSxFQUNWLE1BQWUsRUFDZixZQUEyQixFQUMzQixRQUE4QjtZQUU5QixJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUN6QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUMzQyxPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztJQUVGLHdCQUF3QjtJQUN4QixzQkFBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsQyxrQkFBZSxPQUFPLENBQUMifQ==