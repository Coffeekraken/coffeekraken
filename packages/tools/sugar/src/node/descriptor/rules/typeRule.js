// @ts-nocheck
// @shared
import __ofType from '../../is/ofType';
import SDescriptor from '../_SDescriptor';
const ruleObj = {
    name: 'Type',
    id: 'type',
    settings: {},
    message: (resultObj) => {
        return `This value has to be of type "<yellow>${resultObj.expected.type}</yellow>". Received "<red>${resultObj.received.type}</red>"`;
    },
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        const res = __ofType(value, params.value, {
            name: settings.name
        });
        if (res !== true)
            return res;
        return true;
    }
};
// register the new rule
SDescriptor.registerRule(ruleObj);
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTtBQUVWLE9BQU8sUUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBTXZDLE9BQU8sV0FBVyxNQUFNLGlCQUFpQixDQUFDO0FBcUIxQyxNQUFNLE9BQU8sR0FBcUI7SUFDaEMsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLFFBQVEsRUFBRSxFQUFFO0lBQ1osT0FBTyxFQUFFLENBQUMsU0FBYyxFQUFVLEVBQUU7UUFDbEMsT0FBTyx5Q0FBeUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDhCQUE4QixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDO0lBQ3hJLENBQUM7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFlLEVBQUUsRUFBRTtRQUNqQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDTCxLQUFVLEVBQ1YsTUFBZSxFQUNmLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0EsRUFBRTtRQUNoQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDeEMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1NBQ3BCLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxLQUFLLElBQUk7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFDO0FBRUYsd0JBQXdCO0FBQ3hCLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbEMsZUFBZSxPQUFPLENBQUMifQ==