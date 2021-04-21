// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-type"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxrRUFBMkM7SUFzQjNDLE1BQU0sT0FBTyxHQUFxQjtRQUNoQyxJQUFJLEVBQUUsTUFBTTtRQUNaLEVBQUUsRUFBRSxNQUFNO1FBQ1YsUUFBUSxFQUFFLEVBQUU7UUFDWixPQUFPLEVBQUUsQ0FBQyxTQUFjLEVBQVUsRUFBRTtZQUNsQyxPQUFPLHlDQUF5QyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksOEJBQThCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLENBQUM7UUFDeEksQ0FBQztRQUNELGFBQWEsRUFBRSxDQUFDLE1BQVcsRUFBRSxFQUFFOztZQUM3QixJQUFJLEVBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksQ0FBQSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDL0MsTUFBTSxJQUFJLEtBQUssQ0FDYix1UEFBdVAsQ0FDeFAsQ0FBQzthQUNIO1lBQ0QsT0FBTztnQkFDTCxJQUFJLFFBQUUsTUFBTSxDQUFDLElBQUksbUNBQUksTUFBTTtnQkFDM0IsSUFBSSxRQUFFLE1BQU0sQ0FBQyxJQUFJLG1DQUFJLElBQUk7Z0JBQ3pCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTthQUNsQixDQUFDO1FBQ0osQ0FBQztRQUNELEtBQUssRUFBRSxDQUNMLEtBQVUsRUFDVixNQUFlLEVBQ2YsWUFBMkIsRUFDM0IsUUFBOEIsRUFDQSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksZ0JBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUNwQyxLQUFLLEVBQUU7b0JBQ0wsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFO2lCQUNoQjthQUNGLENBQUMsQ0FBQztZQUNILElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLE9BQU8sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUNyQztZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztLQUNGLENBQUM7SUFFRixrQkFBZSxPQUFPLENBQUMifQ==