"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ofType_1 = __importDefault(require("../../is/ofType"));
const _SDescriptor_1 = __importDefault(require("../_SDescriptor"));
const ruleObj = {
    name: 'Type',
    id: 'type',
    settings: {},
    message: (resultObj) => {
        return `This value has to be of type "<yellow>${resultObj.expected.type}</yellow>". Received "<red>${resultObj.received.type}</red>"`;
    },
    processParams: (params) => {
        return { value: params };
    },
    apply: (value, params, ruleSettings, settings) => {
        const res = ofType_1.default(value, params.value, {
            name: settings.name
        });
        if (res !== true)
            return res;
        return true;
    }
};
// register the new rule
_SDescriptor_1.default.registerRule(ruleObj);
exports.default = ruleObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZVJ1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0eXBlUnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLFVBQVU7Ozs7O0FBRVYsNkRBQXVDO0FBTXZDLG1FQUEwQztBQXFCMUMsTUFBTSxPQUFPLEdBQXFCO0lBQ2hDLElBQUksRUFBRSxNQUFNO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixRQUFRLEVBQUUsRUFBRTtJQUNaLE9BQU8sRUFBRSxDQUFDLFNBQWMsRUFBVSxFQUFFO1FBQ2xDLE9BQU8seUNBQXlDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSw4QkFBOEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFNBQVMsQ0FBQztJQUN4SSxDQUFDO0lBQ0QsYUFBYSxFQUFFLENBQUMsTUFBZSxFQUFFLEVBQUU7UUFDakMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0QsS0FBSyxFQUFFLENBQ0wsS0FBVSxFQUNWLE1BQWUsRUFDZixZQUEyQixFQUMzQixRQUE4QixFQUNBLEVBQUU7UUFDaEMsTUFBTSxHQUFHLEdBQUcsZ0JBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUN4QyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7U0FDcEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxHQUFHLEtBQUssSUFBSTtZQUFFLE9BQU8sR0FBRyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGLENBQUM7QUFFRix3QkFBd0I7QUFDeEIsc0JBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFbEMsa0JBQWUsT0FBTyxDQUFDIn0=