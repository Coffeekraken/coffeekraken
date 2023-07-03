// @ts-nocheck
import __SType from '@coffeekraken/s-type';
const ruleObj = {
    prority: 10,
    name: 'Type',
    id: 'type',
    settings: {},
    processParams: (params) => {
        var _a, _b;
        if (!(params === null || params === void 0 ? void 0 : params.type) && typeof params !== 'string') {
            throw new Error(`<yellow>[sugar.shared.type.descriptors.typeRule]</yellow> Sorry but to use the <magenta>type</magenta> descriptor rule you need to specify a type string either directly under the "type" property, or in an object under the "type.type" property...`);
        }
        return Object.assign(Object.assign({}, (typeof params !== 'string' ? params : {})), { type: (_a = params.type) !== null && _a !== void 0 ? _a : params, cast: (_b = params.cast) !== null && _b !== void 0 ? _b : true });
    },
    apply: (value, params, ruleSettings, settings) => {
        const type = new __SType(params.type, {
            metas: {
                id: settings.id,
            },
        });
        if (params.cast && !type.is(value)) {
            value = type.cast(value, params);
        }
        if (!type.is(value)) {
            return new Error(`The value must be of type "<yellow>${params.type}</yellow>" but you've passed a value of type "<cyan>${typeof value}</cyan>"`);
        }
        return value;
    },
};
export default ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQXNCM0MsTUFBTSxPQUFPLEdBQXFCO0lBQzlCLE9BQU8sRUFBRSxFQUFFO0lBQ1gsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLFFBQVEsRUFBRSxFQUFFO0lBQ1osYUFBYSxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7O1FBQzNCLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLENBQUEsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FDWCx1UEFBdVAsQ0FDMVAsQ0FBQztTQUNMO1FBRUQsdUNBQ08sQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQzdDLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLE1BQU0sRUFDM0IsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSSxJQUMzQjtJQUNOLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDSCxLQUFVLEVBQ1YsTUFBZSxFQUNmLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0YsRUFBRTtRQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2xDLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUU7YUFDbEI7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxLQUFLLENBQ1osc0NBQ0ksTUFBTSxDQUFDLElBQ1gsdURBQXVELE9BQU8sS0FBSyxVQUFVLENBQ2hGLENBQUM7U0FDTDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFDO0FBRUYsZUFBZSxPQUFPLENBQUMifQ==