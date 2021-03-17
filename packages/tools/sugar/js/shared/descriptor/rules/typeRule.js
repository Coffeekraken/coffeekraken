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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2hhcmVkL2Rlc2NyaXB0b3IvcnVsZXMvdHlwZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDJEQUF1QztJQU12QyxpRUFBMEM7SUFxQjFDLElBQU0sT0FBTyxHQUFxQjtRQUNoQyxJQUFJLEVBQUUsTUFBTTtRQUNaLEVBQUUsRUFBRSxNQUFNO1FBQ1YsUUFBUSxFQUFFLEVBQUU7UUFDWixPQUFPLEVBQUUsVUFBQyxTQUFjO1lBQ3RCLE9BQU8sNENBQXlDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxxQ0FBOEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGFBQVMsQ0FBQztRQUN4SSxDQUFDO1FBQ0QsYUFBYSxFQUFFLFVBQUMsTUFBZTtZQUM3QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFDRCxLQUFLLEVBQUUsVUFDTCxLQUFVLEVBQ1YsTUFBZSxFQUNmLFlBQTJCLEVBQzNCLFFBQThCO1lBRTlCLElBQU0sR0FBRyxHQUFHLGdCQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hDLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTthQUNwQixDQUFDLENBQUM7WUFFSCxJQUFJLEdBQUcsS0FBSyxJQUFJO2dCQUFFLE9BQU8sR0FBRyxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztLQUNGLENBQUM7SUFFRix3QkFBd0I7SUFDeEIsc0JBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFbEMsa0JBQWUsT0FBTyxDQUFDIn0=