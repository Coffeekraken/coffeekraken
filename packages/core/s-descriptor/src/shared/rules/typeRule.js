// @ts-nocheck
import __SType from '@coffeekraken/s-type';
const ruleObj = {
    name: 'Type',
    id: 'type',
    settings: {},
    message: (resultObj) => {
        return `This value has to be of type "<yellow>${resultObj.expected.type}</yellow>". Received "<red>${resultObj.received.type}</red>"`;
    },
    processParams: (params) => {
        var _a, _b;
        if (!(params === null || params === void 0 ? void 0 : params.type) && typeof params !== 'string') {
            throw new Error(`<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...`);
        }
        return {
            type: (_a = params.type) !== null && _a !== void 0 ? _a : params,
            cast: (_b = params.cast) !== null && _b !== void 0 ? _b : true,
            plop: params.plop
        };
    },
    apply: (value, params, ruleSettings, settings) => {
        const type = new __SType(params.type, {
            metas: {
                id: settings.id
            }
        });
        if (params.cast && !type.is(value)) {
            value = type.cast(value);
        }
        if (!type.is(value)) {
            return new Error('Something false');
        }
        return value;
    }
};
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFzQjNDLE1BQU0sT0FBTyxHQUFxQjtJQUNoQyxJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxNQUFNO0lBQ1YsUUFBUSxFQUFFLEVBQUU7SUFDWixPQUFPLEVBQUUsQ0FBQyxTQUFjLEVBQVUsRUFBRTtRQUNsQyxPQUFPLHlDQUF5QyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksOEJBQThCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUM7SUFDeEksQ0FBQztJQUNELGFBQWEsRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFOztRQUM3QixJQUFJLEVBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksQ0FBQSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUMvQyxNQUFNLElBQUksS0FBSyxDQUNiLHVQQUF1UCxDQUN4UCxDQUFDO1NBQ0g7UUFDRCxPQUFPO1lBQ0wsSUFBSSxRQUFFLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLE1BQU07WUFDM0IsSUFBSSxRQUFFLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLElBQUk7WUFDekIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQ0wsS0FBVSxFQUNWLE1BQWUsRUFDZixZQUEyQixFQUMzQixRQUE4QixFQUNBLEVBQUU7UUFDaEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQyxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2FBQ2hCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGLENBQUM7QUFFRixlQUFlLE9BQU8sQ0FBQyJ9