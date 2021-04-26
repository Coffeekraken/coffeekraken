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
function default_1(params = {}, atRule, processNested) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZOztBQXNCZCwwREFBUztBQXJCbEQsZ0RBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7UUFDMUIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsTUFBTTtLQUNoQjtDQUNGLENBQUM7QUFVSixtQkFDRSxTQUF1RCxFQUFFLEVBQ3pELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxXQUFXLG1CQUNmLE1BQU0sRUFBRSxLQUFLLEVBQ2IsU0FBUyxFQUFFLE1BQU0sSUFDZCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixRQUFRLFdBQVcsQ0FBQyxNQUFNLEVBQUU7UUFDMUIsS0FBSyxLQUFLLENBQUM7UUFDWDtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUM7O2NBR0YsV0FBVyxDQUFDLFNBQVMsS0FBSyxNQUFNLElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyxHQUFHO2dCQUMvRCxDQUFDLENBQUMsWUFBWTtnQkFDZCxDQUFDLENBQUMsRUFDTjtjQUVFLFdBQVcsQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssR0FBRztnQkFDL0QsQ0FBQyxDQUFDLFdBQVc7Z0JBQ2IsQ0FBQyxDQUFDLEVBQ047Y0FFRSxXQUFXLENBQUMsU0FBUyxLQUFLLE1BQU07Z0JBQzlCLENBQUMsQ0FBQyxtQ0FBbUM7Z0JBQ3JDLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxLQUFLLEdBQUc7b0JBQy9CLENBQUMsQ0FBQyw4QkFBOEI7b0JBQ2hDLENBQUMsQ0FBQyw4QkFDTjtTQUNILENBQUMsQ0FBQztZQUNMLE1BQU07S0FDVDtJQUVELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBekNELDRCQXlDQyJ9