// @ts-nocheck
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
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUF1QmQsTUFBTSxPQUFPLEdBQXFCO0lBQzlCLFFBQVEsRUFBRSxDQUFDO0lBQ1gsSUFBSSxFQUFFLFVBQVU7SUFDaEIsRUFBRSxFQUFFLFVBQVU7SUFDZCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO0tBQzFCO0lBQ0QsT0FBTyxFQUFFLHdCQUF3QjtJQUNqQyxhQUFhLEVBQUUsQ0FBQyxNQUFlLEVBQUUsRUFBRTtRQUMvQixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDSCxLQUFVLEVBQ1YsTUFBbUIsRUFDbkIsWUFBMkIsRUFDM0IsUUFBOEIsRUFDRixFQUFFO1FBQzlCLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDdkIsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsT0FBTyxJQUFJLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO2FBQ2xFO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQztBQUVGLGVBQWUsT0FBTyxDQUFDIn0=