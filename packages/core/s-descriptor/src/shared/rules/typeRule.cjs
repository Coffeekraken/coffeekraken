"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_type_1 = __importDefault(require("@coffeekraken/s-type"));
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
        const type = new s_type_1.default(params.type, {
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
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtZGVzY3JpcHRvci9zcmMvc2hhcmVkL3J1bGVzL3R5cGVSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUEyQztBQXNCM0MsTUFBTSxPQUFPLEdBQXFCO0lBQ2hDLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixRQUFRLEVBQUUsRUFBRTtJQUNaLE9BQU8sRUFBRSxDQUFDLFNBQWMsRUFBVSxFQUFFO1FBQ2xDLE9BQU8seUNBQXlDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSw4QkFBOEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUN4SSxDQUFDO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7O1FBQzdCLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLENBQUEsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FDYix1UEFBdVAsQ0FDeFAsQ0FBQztTQUNIO1FBQ0QsT0FBTztZQUNMLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLE1BQU07WUFDM0IsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSTtZQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUk7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDTCxLQUFVLEVBQ1YsTUFBZSxFQUNmLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0EsRUFBRTtRQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNwQyxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2FBQ2hCO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNsQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUNyQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxPQUFPLENBQUMifQ==