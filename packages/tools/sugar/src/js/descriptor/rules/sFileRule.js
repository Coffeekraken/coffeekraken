// @ts-nocheck
// @shared
import SDescriptor from '../_SDescriptor';
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
// register the new rule
SDescriptor.registerRule(ruleObj);
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic0ZpbGVSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic0ZpbGVSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBT1YsT0FBTyxXQUFXLE1BQU0saUJBQWlCLENBQUM7QUFvQjFDLE1BQU0sT0FBTyxHQUFxQjtJQUNoQyxJQUFJLEVBQUUsVUFBVTtJQUNoQixFQUFFLEVBQUUsVUFBVTtJQUNkLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7S0FDeEI7SUFDRCxPQUFPLEVBQUUsd0JBQXdCO0lBQ2pDLGFBQWEsRUFBRSxDQUFDLE1BQWUsRUFBRSxFQUFFO1FBQ2pDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFlLEVBQ2YsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1FBQ2hDLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDekIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDM0MsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YsQ0FBQztBQUVGLHdCQUF3QjtBQUN4QixXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRWxDLGVBQWUsT0FBTyxDQUFDIn0=