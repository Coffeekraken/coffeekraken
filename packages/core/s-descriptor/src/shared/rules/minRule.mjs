// @ts-nocheck
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
            return {
                min: params.value,
                received: value
            };
        }
        return true;
    }
};
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1kZXNjcmlwdG9yL3NyYy9zaGFyZWQvcnVsZXMvbWluUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBb0JkLE1BQU0sT0FBTyxHQUFxQjtJQUNoQyxJQUFJLEVBQUUsS0FBSztJQUNYLEVBQUUsRUFBRSxLQUFLO0lBQ1QsUUFBUSxFQUFFLEVBQUU7SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixPQUFPLEVBQUUsQ0FBQyxTQUFjLEVBQVUsRUFBRTtRQUNsQyxPQUFPLHlDQUF5QyxTQUFTLENBQUMsR0FBRyw4QkFBOEIsU0FBUyxDQUFDLFFBQVEsU0FBUyxDQUFDO0lBQ3pILENBQUM7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRTtRQUNoQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDTCxLQUFVLEVBQ1YsTUFBbUIsRUFDbkIsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1FBQ2hDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDeEIsT0FBTztnQkFDTCxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQUs7Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUM7QUFFRixlQUFlLE9BQU8sQ0FBQyJ9