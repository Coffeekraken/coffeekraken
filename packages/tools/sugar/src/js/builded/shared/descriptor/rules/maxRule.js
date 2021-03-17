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
        name: 'Max',
        id: 'max',
        settings: {},
        accept: 'Number',
        message: function (resultObj) {
            return "This value has to be maximum \"<yellow>" + resultObj.max + "</yellow>\". Received \"<red>" + resultObj.received + "</red>\"";
        },
        processParams: function (params) {
            return { value: params };
        },
        apply: function (value, params, ruleSettings, settings) {
            if (value > params.value) {
                return {
                    max: params.value,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4UnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NoYXJlZC9kZXNjcmlwdG9yL3J1bGVzL21heFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQVFWLGlFQUEwQztJQWlCMUMsSUFBTSxPQUFPLEdBQXFCO1FBQ2hDLElBQUksRUFBRSxLQUFLO1FBQ1gsRUFBRSxFQUFFLEtBQUs7UUFDVCxRQUFRLEVBQUUsRUFBRTtRQUNaLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxVQUFDLFNBQWM7WUFDdEIsT0FBTyw0Q0FBeUMsU0FBUyxDQUFDLEdBQUcscUNBQThCLFNBQVMsQ0FBQyxRQUFRLGFBQVMsQ0FBQztRQUN6SCxDQUFDO1FBQ0QsYUFBYSxFQUFFLFVBQUMsTUFBYztZQUM1QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFDRCxLQUFLLEVBQUUsVUFDTCxLQUFVLEVBQ1YsTUFBZSxFQUNmLFlBQTJCLEVBQzNCLFFBQThCO1lBRTlCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hCLE9BQU87b0JBQ0wsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLO29CQUNqQixRQUFRLEVBQUUsS0FBSztpQkFDaEIsQ0FBQzthQUNIO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0tBQ0YsQ0FBQztJQUVGLHdCQUF3QjtJQUN4QixzQkFBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVsQyxrQkFBZSxPQUFPLENBQUMifQ==