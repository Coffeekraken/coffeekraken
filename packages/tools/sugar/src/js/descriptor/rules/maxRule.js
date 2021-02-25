// @ts-nocheck
// @shared
import SDescriptor from '../_SDescriptor';
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
SDescriptor.registerRule(ruleObj);
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF4UnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1heFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFRVixPQUFPLFdBQVcsTUFBTSxpQkFBaUIsQ0FBQztBQWlCMUMsTUFBTSxPQUFPLEdBQXFCO0lBQ2hDLElBQUksRUFBRSxLQUFLO0lBQ1gsRUFBRSxFQUFFLEtBQUs7SUFDVCxRQUFRLEVBQUUsRUFBRTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxDQUFDLFNBQWMsRUFBVSxFQUFFO1FBQ2xDLE9BQU8seUNBQXlDLFNBQVMsQ0FBQyxHQUFHLDhCQUE4QixTQUFTLENBQUMsUUFBUSxTQUFTLENBQUM7SUFDekgsQ0FBQztJQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFO1FBQ2hDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFlLEVBQ2YsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1FBQ2hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDeEIsT0FBTztnQkFDTCxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUM7QUFFRix3QkFBd0I7QUFDeEIsV0FBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVsQyxlQUFlLE9BQU8sQ0FBQyJ9