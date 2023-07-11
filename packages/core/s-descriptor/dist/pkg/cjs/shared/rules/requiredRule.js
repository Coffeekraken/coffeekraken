"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const ruleObj = {
    priority: 1,
    name: 'Required',
    id: 'required',
    settings: {
        when: [undefined, null],
    },
    message: 'This value is required',
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        if (params.value === true) {
            if (ruleSettings.when.indexOf(value) !== -1) {
                return new Error('This property is <yellow>required</yellow>');
            }
        }
        return value;
    },
};
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQTBCZCxNQUFNLE9BQU8sR0FBcUI7SUFDOUIsUUFBUSxFQUFFLENBQUM7SUFDWCxJQUFJLEVBQUUsVUFBVTtJQUNoQixFQUFFLEVBQUUsVUFBVTtJQUNkLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7S0FDMUI7SUFDRCxPQUFPLEVBQUUsd0JBQXdCO0lBQ2pDLGFBQWEsRUFBRSxDQUFDLE1BQWUsRUFBRSxFQUFFO1FBQy9CLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELEtBQUssRUFBRSxDQUNILEtBQVUsRUFDVixNQUFtQixFQUNuQixZQUEyQixFQUMzQixRQUE4QixFQUNGLEVBQUU7UUFDOUIsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTtZQUN2QixJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QyxPQUFPLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7YUFDbEU7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFDO0FBRUYsa0JBQWUsT0FBTyxDQUFDIn0=