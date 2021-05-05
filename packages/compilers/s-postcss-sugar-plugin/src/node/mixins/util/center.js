"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginUtilCenterInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginUtilCenterInterface;
postcssSugarPluginUtilCenterInterface.definition = {
    method: {
        type: 'String',
        values: ['abs'],
        required: true,
        default: 'abs'
    },
    direction: {
        type: 'String',
        values: ['x', 'y', 'both'],
        required: true,
        default: 'both'
    }
};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({ method: 'abs', direction: 'both' }, params);
    const vars = [];
    switch (finalParams.method) {
        case 'abs':
        default:
            vars.push(`
            position: absolute;
            ${finalParams.direction === 'both' || finalParams.direction === 'x'
                ? 'left: 50%;'
                : ''}
            ${finalParams.direction === 'both' || finalParams.direction === 'y'
                ? 'top: 50%;'
                : ''}
            ${finalParams.direction === 'both'
                ? 'transform: translate(-50%, -50%);'
                : finalParams.direction === 'y'
                    ? 'transform: translateY(-50%);'
                    : 'transform: translateX(-50%);'}
        `);
            break;
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZOztBQXNCZCwwREFBUztBQXJCbEQsZ0RBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7UUFDMUIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsTUFBTTtLQUNoQjtDQUNGLENBQUM7QUFVSixtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsTUFBTSxFQUFFLEtBQUssRUFDYixTQUFTLEVBQUUsTUFBTSxJQUNkLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLFFBQVEsV0FBVyxDQUFDLE1BQU0sRUFBRTtRQUMxQixLQUFLLEtBQUssQ0FBQztRQUNYO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQzs7Y0FHRixXQUFXLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLEdBQUc7Z0JBQy9ELENBQUMsQ0FBQyxZQUFZO2dCQUNkLENBQUMsQ0FBQyxFQUNOO2NBRUUsV0FBVyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyxHQUFHO2dCQUMvRCxDQUFDLENBQUMsV0FBVztnQkFDYixDQUFDLENBQUMsRUFDTjtjQUVFLFdBQVcsQ0FBQyxTQUFTLEtBQUssTUFBTTtnQkFDOUIsQ0FBQyxDQUFDLG1DQUFtQztnQkFDckMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEtBQUssR0FBRztvQkFDL0IsQ0FBQyxDQUFDLDhCQUE4QjtvQkFDaEMsQ0FBQyxDQUFDLDhCQUNOO1NBQ0gsQ0FBQyxDQUFDO1lBQ0wsTUFBTTtLQUNUO0lBRUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUE3Q0QsNEJBNkNDIn0=