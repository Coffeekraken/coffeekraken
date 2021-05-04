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
                id: settings.id
            }
        });
        if (params.cast && !type.is(value)) {
            value = type.cast(value, params);
        }
        if (!type.is(value)) {
            return new Error(`The value must be of type "<yellow>${params.type}</yellow>" but you've passed a value of type "<cyan>${typeof value}</cyan>"`);
        }
        return value;
    }
};
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRUFBMkM7QUFzQjNDLE1BQU0sT0FBTyxHQUFxQjtJQUNoQyxJQUFJLEVBQUUsTUFBTTtJQUNaLEVBQUUsRUFBRSxNQUFNO0lBQ1YsUUFBUSxFQUFFLEVBQUU7SUFDWixhQUFhLEVBQUUsQ0FBQyxNQUFXLEVBQUUsRUFBRTs7UUFDN0IsSUFBSSxFQUFDLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxJQUFJLENBQUEsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FDYix1UEFBdVAsQ0FDeFAsQ0FBQztTQUNIO1FBRUQsdUNBQ0ssQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQzdDLElBQUksUUFBRSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxNQUFNLEVBQzNCLElBQUksUUFBRSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJLElBQ3pCO0lBQ0osQ0FBQztJQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFlLEVBQ2YsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3BDLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUU7YUFDaEI7U0FDRixDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLE9BQU8sSUFBSSxLQUFLLENBQ2Qsc0NBQ0UsTUFBTSxDQUFDLElBQ1QsdURBQXVELE9BQU8sS0FBSyxVQUFVLENBQzlFLENBQUM7U0FDSDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGLENBQUM7QUFFRixrQkFBZSxPQUFPLENBQUMifQ==