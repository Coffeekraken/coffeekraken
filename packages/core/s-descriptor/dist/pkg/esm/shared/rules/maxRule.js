// @ts-nocheck
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
            return new Error(`<red>[minRule]</red> Sorry but the passed value "<yellow>${value}</yellow>" must be lower or equal at <cyan>${params.value}</cyan>`);
        }
        return value;
    },
};
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFvQmQsTUFBTSxPQUFPLEdBQXFCO0lBQzlCLElBQUksRUFBRSxLQUFLO0lBQ1gsRUFBRSxFQUFFLEtBQUs7SUFDVCxRQUFRLEVBQUUsRUFBRTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxDQUFDLFNBQWMsRUFBVSxFQUFFO1FBQ2hDLE9BQU8seUNBQXlDLFNBQVMsQ0FBQyxHQUFHLDhCQUE4QixTQUFTLENBQUMsUUFBUSxTQUFTLENBQUM7SUFDM0gsQ0FBQztJQUNELGFBQWEsRUFBRSxDQUFDLE1BQWMsRUFBRSxFQUFFO1FBQzlCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELEtBQUssRUFBRSxDQUNILEtBQVUsRUFDVixNQUFtQixFQUNuQixZQUEyQixFQUMzQixRQUE4QixFQUNGLEVBQUU7UUFDOUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUN0QixPQUFPLElBQUksS0FBSyxDQUNaLDREQUE0RCxLQUFLLDhDQUE4QyxNQUFNLENBQUMsS0FBSyxTQUFTLENBQ3ZJLENBQUM7U0FDTDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxPQUFPLENBQUMifQ==