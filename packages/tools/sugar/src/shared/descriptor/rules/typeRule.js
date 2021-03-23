"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SType_1 = __importDefault(require("../../type/SType"));
const _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
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
        const type = new SType_1.default(params.type, {
            metas: {
                id: settings.id
            }
        });
        if (params.cast && !type.is(value)) {
            value = type.cast(value);
            if (params.plop) {
                console.log('CC', params, value);
            }
        }
        if (!type.is(value)) {
            return new Error('Something false');
        }
        return value;
    }
};
// register the new rule
_SDescriptor_1.default.registerRule(ruleObj);
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCw2REFBdUM7QUFFdkMsbUVBR3lCO0FBcUJ6QixNQUFNLE9BQU8sR0FBcUI7SUFDaEMsSUFBSSxFQUFFLE1BQU07SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLFFBQVEsRUFBRSxFQUFFO0lBQ1osT0FBTyxFQUFFLENBQUMsU0FBYyxFQUFVLEVBQUU7UUFDbEMsT0FBTyx5Q0FBeUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDhCQUE4QixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksU0FBUyxDQUFDO0lBQ3hJLENBQUM7SUFDRCxhQUFhLEVBQUUsQ0FBQyxNQUFXLEVBQUUsRUFBRTs7UUFDN0IsSUFBSSxDQUFDLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksQ0FBQSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUMvQyxNQUFNLElBQUksS0FBSyxDQUNiLHVQQUF1UCxDQUN4UCxDQUFDO1NBQ0g7UUFDRCxPQUFPO1lBQ0wsSUFBSSxFQUFFLE1BQUEsTUFBTSxDQUFDLElBQUksbUNBQUksTUFBTTtZQUMzQixJQUFJLEVBQUUsTUFBQSxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJO1lBQ3pCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtTQUNsQixDQUFDO0lBQ0osQ0FBQztJQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFlLEVBQ2YsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksZUFBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDcEMsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRTthQUNoQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekIsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNsQztTQUNGO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YsQ0FBQztBQUVGLHdCQUF3QjtBQUN4QixzQkFBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVsQyxrQkFBZSxPQUFPLENBQUMifQ==