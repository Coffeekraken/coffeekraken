"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginSpaceFunctionInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginSpaceFunctionInterface;
postcssSugarPluginSpaceFunctionInterface.definition = {
    space: {
        type: 'String',
        values: Object.keys(theme_1.default().config('space')),
        default: 'default',
        required: true
    },
    return: {
        type: 'String',
        values: ['var', 'value'],
        default: 'var'
    }
};
function default_1({ params }) {
    const finalParams = Object.assign({ space: '', return: 'var' }, params);
    const space = finalParams.space;
    if (theme_1.default().config('space')[space] === undefined)
        return space;
    let size = theme_1.default().config(`space.${space}`);
    if (finalParams.return === 'var') {
        return `var(--s-theme-space-${space}, ${size})`;
    }
    else {
        return size;
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsOERBQXdDO0FBRXhDLE1BQU0sd0NBQXlDLFNBQVEscUJBQVk7O0FBZWQsNkRBQVM7QUFkckQsbURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDO1FBQ3hCLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBU0osbUJBQXlCLEVBQ3ZCLE1BQU0sRUFHUDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxFQUNULE1BQU0sRUFBRSxLQUFLLElBQ1YsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBRWhDLElBQUksZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUVqRSxJQUFJLElBQUksR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRTlDLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDaEMsT0FBTyx1QkFBdUIsS0FBSyxLQUFLLElBQUksR0FBRyxDQUFDO0tBQ2pEO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQXRCRCw0QkFzQkMifQ==