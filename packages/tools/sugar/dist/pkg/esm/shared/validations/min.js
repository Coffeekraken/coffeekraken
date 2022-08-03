// @ts-nocheck
import __deepMerge from '../object/deepMerge';
export default function min(value, n, settings) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let message, valid;
    const finalSettings = __deepMerge({
        message: {
            string: 'This must have at least %n characters',
            object: 'This must have at least %n properties',
            number: 'This must be greater than %n',
            array: 'This must have at least %n items',
        },
    }, settings !== null && settings !== void 0 ? settings : {});
    switch (true) {
        case typeof value === 'string':
            valid = value.length >= n;
            message = (_b = (_a = finalSettings.message) === null || _a === void 0 ? void 0 : _a.string) === null || _b === void 0 ? void 0 : _b.replace('%n', n);
            break;
        case typeof value === 'number':
            valid = value >= n;
            message = (_d = (_c = finalSettings.message) === null || _c === void 0 ? void 0 : _c.number) === null || _d === void 0 ? void 0 : _d.replace('%n', n);
            break;
        case Array.isArray(value):
            valid = value.length >= n;
            message = (_f = (_e = finalSettings.message) === null || _e === void 0 ? void 0 : _e.array) === null || _f === void 0 ? void 0 : _f.replace('%n', n);
            break;
        case typeof value === 'object':
            valid = Object.keys(value).length >= n;
            message = (_h = (_g = finalSettings.message) === null || _g === void 0 ? void 0 : _g.object) === null || _h === void 0 ? void 0 : _h.replace('%n', n);
            break;
        default:
            throw new Error(`Sorry but the "min" validation only works with string, number, array or object values.`);
            break;
    }
    return {
        valid,
        message,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQXFEOUMsTUFBTSxDQUFDLE9BQU8sVUFBVSxHQUFHLENBQ3ZCLEtBQVUsRUFDVixDQUFTLEVBQ1QsUUFBMEM7O0lBRTFDLElBQUksT0FBTyxFQUFFLEtBQUssQ0FBQztJQUVuQixNQUFNLGFBQWEsR0FBMkIsV0FBVyxDQUNyRDtRQUNJLE9BQU8sRUFBRTtZQUNMLE1BQU0sRUFBRSx1Q0FBdUM7WUFDL0MsTUFBTSxFQUFFLHVDQUF1QztZQUMvQyxNQUFNLEVBQUUsOEJBQThCO1lBQ3RDLEtBQUssRUFBRSxrQ0FBa0M7U0FDNUM7S0FDSixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FBQztJQUVGLFFBQVEsSUFBSSxFQUFFO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsTUFBQSxNQUFBLGFBQWEsQ0FBQyxPQUFPLDBDQUFFLE1BQU0sMENBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRCxNQUFNO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBQ25CLE9BQU8sR0FBRyxNQUFBLE1BQUEsYUFBYSxDQUFDLE9BQU8sMENBQUUsTUFBTSwwQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFELE1BQU07UUFDVixLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3JCLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPLEdBQUcsTUFBQSxNQUFBLGFBQWEsQ0FBQyxPQUFPLDBDQUFFLEtBQUssMENBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNO1FBQ1YsS0FBSyxPQUFPLEtBQUssS0FBSyxRQUFRO1lBQzFCLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDdkMsT0FBTyxHQUFHLE1BQUEsTUFBQSxhQUFhLENBQUMsT0FBTywwQ0FBRSxNQUFNLDBDQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsTUFBTTtRQUNWO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FDWCx3RkFBd0YsQ0FDM0YsQ0FBQztZQUNGLE1BQU07S0FDYjtJQUVELE9BQU87UUFDSCxLQUFLO1FBQ0wsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDIn0=