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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtZGVzY3JpcHRvci9zcmMvc2hhcmVkL3J1bGVzL3R5cGVSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQXNCM0MsTUFBTSxPQUFPLEdBQXFCO0lBQ2hDLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixRQUFRLEVBQUUsRUFBRTtJQUNaLE9BQU8sRUFBRSxDQUFDLFNBQWMsRUFBVSxFQUFFO1FBQ2xDLE9BQU8seUNBQXlDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSw4QkFBOEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUN4SSxDQUFDO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7O1FBQzdCLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLENBQUEsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FDYix1UEFBdVAsQ0FDeFAsQ0FBQztTQUNIO1FBQ0QsT0FBTztZQUNMLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLE1BQU07WUFDM0IsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSTtZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDTCxLQUFVLEVBQ1YsTUFBZSxFQUNmLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0EsRUFBRTtRQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3BDLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUU7YUFDaEI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQztBQUVGLGVBQWUsT0FBTyxDQUFDIn0=