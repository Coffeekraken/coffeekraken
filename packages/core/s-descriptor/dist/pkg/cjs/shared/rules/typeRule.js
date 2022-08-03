"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_type_1 = __importDefault(require("@coffeekraken/s-type"));
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
        const type = new s_type_1.default(params.type, {
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
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtFQUEyQztBQXNCM0MsTUFBTSxPQUFPLEdBQXFCO0lBQzlCLE9BQU8sRUFBRSxFQUFFO0lBQ1gsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLFFBQVEsRUFBRSxFQUFFO0lBQ1osYUFBYSxFQUFFLENBQUMsTUFBVyxFQUFFLEVBQUU7O1FBQzNCLElBQUksQ0FBQyxDQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLENBQUEsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FDWCx1UEFBdVAsQ0FDMVAsQ0FBQztTQUNMO1FBRUQsdUNBQ08sQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQzdDLElBQUksRUFBRSxNQUFBLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLE1BQU0sRUFDM0IsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksSUFBSSxJQUMzQjtJQUNOLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FDSCxLQUFVLEVBQ1YsTUFBZSxFQUNmLFlBQTJCLEVBQzNCLFFBQThCLEVBQ0YsRUFBRTtRQUM5QixNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRTtZQUNsQyxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2FBQ2xCO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixPQUFPLElBQUksS0FBSyxDQUNaLHNDQUNJLE1BQU0sQ0FBQyxJQUNYLHVEQUF1RCxPQUFPLEtBQUssVUFBVSxDQUNoRixDQUFDO1NBQ0w7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0osQ0FBQztBQUVGLGtCQUFlLE9BQU8sQ0FBQyJ9