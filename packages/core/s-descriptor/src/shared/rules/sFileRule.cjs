"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0ZpbGVSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLWRlc2NyaXB0b3Ivc3JjL3NoYXJlZC9ydWxlcy9zRmlsZVJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBdUJkLE1BQU0sT0FBTyxHQUFxQjtJQUNoQyxJQUFJLEVBQUUsVUFBVTtJQUNoQixFQUFFLEVBQUUsVUFBVTtJQUNkLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7S0FDeEI7SUFDRCxPQUFPLEVBQUUsd0JBQXdCO0lBQ2pDLGFBQWEsRUFBRSxDQUFDLE1BQWUsRUFBRSxFQUFFO1FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFtQixFQUNuQixZQUEyQixFQUMzQixRQUE4QixFQUNBLEVBQUU7UUFDaEMsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUN6QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMzQyxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFDO0FBRUYsa0JBQWUsT0FBTyxDQUFDIn0=