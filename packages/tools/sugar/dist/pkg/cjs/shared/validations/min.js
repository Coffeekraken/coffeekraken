"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
function min(value, n, settings) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let message, valid;
    const finalSettings = (0, deepMerge_1.default)({
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
exports.default = min;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsY0FBYztBQUNkLG9FQUE4QztBQXFEOUMsU0FBd0IsR0FBRyxDQUN2QixLQUFVLEVBQ1YsQ0FBUyxFQUNULFFBQTBDOztJQUUxQyxJQUFJLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFFbkIsTUFBTSxhQUFhLEdBQTJCLElBQUEsbUJBQVcsRUFDckQ7UUFDSSxPQUFPLEVBQUU7WUFDTCxNQUFNLEVBQUUsdUNBQXVDO1lBQy9DLE1BQU0sRUFBRSx1Q0FBdUM7WUFDL0MsTUFBTSxFQUFFLDhCQUE4QjtZQUN0QyxLQUFLLEVBQUUsa0NBQWtDO1NBQzVDO0tBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFFRixRQUFRLElBQUksRUFBRTtRQUNWLEtBQUssT0FBTyxLQUFLLEtBQUssUUFBUTtZQUMxQixLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDMUIsT0FBTyxHQUFHLE1BQUEsTUFBQSxhQUFhLENBQUMsT0FBTywwQ0FBRSxNQUFNLDBDQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsTUFBTTtRQUNWLEtBQUssT0FBTyxLQUFLLEtBQUssUUFBUTtZQUMxQixLQUFLLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUNuQixPQUFPLEdBQUcsTUFBQSxNQUFBLGFBQWEsQ0FBQyxPQUFPLDBDQUFFLE1BQU0sMENBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRCxNQUFNO1FBQ1YsS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDMUIsT0FBTyxHQUFHLE1BQUEsTUFBQSxhQUFhLENBQUMsT0FBTywwQ0FBRSxLQUFLLDBDQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTTtRQUNWLEtBQUssT0FBTyxLQUFLLEtBQUssUUFBUTtZQUMxQixLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sR0FBRyxNQUFBLE1BQUEsYUFBYSxDQUFDLE9BQU8sMENBQUUsTUFBTSwwQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFELE1BQU07UUFDVjtZQUNJLE1BQU0sSUFBSSxLQUFLLENBQ1gsd0ZBQXdGLENBQzNGLENBQUM7WUFDRixNQUFNO0tBQ2I7SUFFRCxPQUFPO1FBQ0gsS0FBSztRQUNMLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQS9DRCxzQkErQ0MifQ==