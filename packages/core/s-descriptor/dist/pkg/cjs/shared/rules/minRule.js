"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const ruleObj = {
    name: 'Min',
    id: 'min',
    settings: {},
    accept: 'Number',
    message: (resultObj) => {
        return `This value has to be minimum "<yellow>${resultObj.min}</yellow>". Received "<red>${resultObj.received}</red>"`;
    },
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        if (value < params.value) {
            return new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${value}</yellow>" must be greater or equal at <cyan>${params.value}</cyan>`);
        }
        return value;
    },
};
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQXVCZCxNQUFNLE9BQU8sR0FBcUI7SUFDOUIsSUFBSSxFQUFFLEtBQUs7SUFDWCxFQUFFLEVBQUUsS0FBSztJQUNULFFBQVEsRUFBRSxFQUFFO0lBQ1osTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLENBQUMsU0FBYyxFQUFVLEVBQUU7UUFDaEMsT0FBTyx5Q0FBeUMsU0FBUyxDQUFDLEdBQUcsOEJBQThCLFNBQVMsQ0FBQyxRQUFRLFNBQVMsQ0FBQztJQUMzSCxDQUFDO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDOUIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQ0gsS0FBVSxFQUNWLE1BQW1CLEVBQ25CLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0YsRUFBRTtRQUM5QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3RCLE9BQU8sSUFBSSxLQUFLLENBQ1osNERBQTRELEtBQUssZ0RBQWdELE1BQU0sQ0FBQyxLQUFLLFNBQVMsQ0FDekksQ0FBQztTQUNMO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKLENBQUM7QUFFRixrQkFBZSxPQUFPLENBQUMifQ==