"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
const ruleObj = {
    name: 'Max',
    id: 'max',
    settings: {},
    accept: 'Number',
    message: (resultObj) => {
        return `This value has to be maximum "<yellow>${resultObj.max}</yellow>". Received "<red>${resultObj.received}</red>"`;
    },
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4UnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1heFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBR2QsbUVBR3lCO0FBaUJ6QixNQUFNLE9BQU8sR0FBcUI7SUFDaEMsSUFBSSxFQUFFLEtBQUs7SUFDWCxFQUFFLEVBQUUsS0FBSztJQUNULFFBQVEsRUFBRSxFQUFFO0lBQ1osTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLENBQUMsU0FBYyxFQUFVLEVBQUU7UUFDbEMsT0FBTyx5Q0FBeUMsU0FBUyxDQUFDLEdBQUcsOEJBQThCLFNBQVMsQ0FBQyxRQUFRLFNBQVMsQ0FBQztJQUN6SCxDQUFDO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDaEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQ0wsS0FBVSxFQUNWLE1BQW1CLEVBQ25CLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0EsRUFBRTtRQUNoQyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3hCLE9BQU87Z0JBQ0wsR0FBRyxFQUFFLE1BQU0sQ0FBQyxLQUFLO2dCQUNqQixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFDO0FBRUYsd0JBQXdCO0FBQ3hCLHNCQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRWxDLGtCQUFlLE9BQU8sQ0FBQyJ9