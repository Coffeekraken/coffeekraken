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
        define(["require", "exports", "../../is/ofType", "../_SDescriptor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ofType_1 = __importDefault(require("../../is/ofType"));
    var _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
    var ruleObj = {
        name: 'Type',
        id: 'type',
        settings: {},
        message: function (resultObj) {
            return "This value has to be of type \"<yellow>" + resultObj.expected.type + "</yellow>\". Received \"<red>" + resultObj.received.type + "</red>\"";
        },
        processParams: function (params) {
            return { value: params };
        },
        apply: function (value, params, ruleSettings, settings) {
            var res = ofType_1.default(value, params.value, {
                name: settings.name
            });
            if (res !== true)
                return res;
            return true;
        }
    };
    // register the new rule
    _SDescriptor_1.default.registerRule(ruleObj);
    exports.default = ruleObj;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zaGFyZWQvZGVzY3JpcHRvci9ydWxlcy90eXBlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsMkRBQXVDO0lBTXZDLGlFQUEwQztJQXFCMUMsSUFBTSxPQUFPLEdBQXFCO1FBQ2hDLElBQUksRUFBRSxNQUFNO1FBQ1osRUFBRSxFQUFFLE1BQU07UUFDVixRQUFRLEVBQUUsRUFBRTtRQUNaLE9BQU8sRUFBRSxVQUFDLFNBQWM7WUFDdEIsT0FBTyw0Q0FBeUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHFDQUE4QixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksYUFBUyxDQUFDO1FBQ3hJLENBQUM7UUFDRCxhQUFhLEVBQUUsVUFBQyxNQUFlO1lBQzdCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUNELEtBQUssRUFBRSxVQUNMLEtBQVUsRUFDVixNQUFlLEVBQ2YsWUFBMkIsRUFDM0IsUUFBOEI7WUFFOUIsSUFBTSxHQUFHLEdBQUcsZ0JBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtnQkFDeEMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2FBQ3BCLENBQUMsQ0FBQztZQUVILElBQUksR0FBRyxLQUFLLElBQUk7Z0JBQUUsT0FBTyxHQUFHLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztJQUVGLHdCQUF3QjtJQUN4QixzQkFBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsQyxrQkFBZSxPQUFPLENBQUMifQ==