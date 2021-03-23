"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("../../is/path"));
const _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
const ruleObj = {
    name: 'Path',
    id: 'path',
    settings: {},
    accept: 'Object|String|Array<String>',
    message: (resultObj) => {
        return `This value has to be maximum "<yellow>${resultObj.max}</yellow>". Received "<red>${resultObj.received}</red>"`;
    },
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        console.log('PATH', value, params, ruleSettings, settings);
        if (!path_1.default(value))
            return false;
        return true;
    }
};
// register the new rule
_SDescriptor_1.default.registerRule(ruleObj);
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aFJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXRoUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCx5REFBcUM7QUFFckMsbUVBR3lCO0FBaUJ6QixNQUFNLE9BQU8sR0FBcUI7SUFDaEMsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLFFBQVEsRUFBRSxFQUFFO0lBQ1osTUFBTSxFQUFFLDZCQUE2QjtJQUNyQyxPQUFPLEVBQUUsQ0FBQyxTQUFjLEVBQVUsRUFBRTtRQUNsQyxPQUFPLHlDQUF5QyxTQUFTLENBQUMsR0FBRyw4QkFBOEIsU0FBUyxDQUFDLFFBQVEsU0FBUyxDQUFDO0lBQ3pILENBQUM7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtRQUNoQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDTCxLQUFVLEVBQ1YsTUFBbUIsRUFDbkIsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxjQUFRLENBQUMsS0FBSyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YsQ0FBQztBQUVGLHdCQUF3QjtBQUN4QixzQkFBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVsQyxrQkFBZSxPQUFPLENBQUMifQ==