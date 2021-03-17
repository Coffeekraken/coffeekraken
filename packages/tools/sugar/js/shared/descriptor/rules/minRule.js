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
        name: 'Min',
        id: 'min',
        settings: {},
        accept: 'Number',
        message: function (resultObj) {
            return "This value has to be minimum \"<yellow>" + resultObj.min + "</yellow>\". Received \"<red>" + resultObj.received + "</red>\"";
        },
        processParams: function (params) {
            return { value: params };
        },
        apply: function (value, params, ruleSettings, settings) {
            if (value < params.value) {
                return {
                    min: params.value,
                    received: value
                };
            }
            return true;
        }
    };
    // register the new rule
    _SDescriptor_1.default.registerRule(ruleObj);
    exports.default = ruleObj;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvZGVzY3JpcHRvci9ydWxlcy9taW5SdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFRVixpRUFBMEM7SUFpQjFDLElBQU0sT0FBTyxHQUFxQjtRQUNoQyxJQUFJLEVBQUUsS0FBSztRQUNYLEVBQUUsRUFBRSxLQUFLO1FBQ1QsUUFBUSxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsUUFBUTtRQUNoQixPQUFPLEVBQUUsVUFBQyxTQUFjO1lBQ3RCLE9BQU8sNENBQXlDLFNBQVMsQ0FBQyxHQUFHLHFDQUE4QixTQUFTLENBQUMsUUFBUSxhQUFTLENBQUM7UUFDekgsQ0FBQztRQUNELGFBQWEsRUFBRSxVQUFDLE1BQWM7WUFDNUIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBQ0QsS0FBSyxFQUFFLFVBQ0wsS0FBVSxFQUNWLE1BQWUsRUFDZixZQUEyQixFQUMzQixRQUE4QjtZQUU5QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUN4QixPQUFPO29CQUNMLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSztvQkFDakIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCLENBQUM7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUNGLENBQUM7SUFFRix3QkFBd0I7SUFDeEIsc0JBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbEMsa0JBQWUsT0FBTyxDQUFDIn0=