"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginColorMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            current: {
                type: 'String',
                required: true,
            },
            accent: {
                type: 'String',
            },
            complementary: {
                type: 'String',
            },
        };
    }
}
exports.interface = postcssSugarPluginColorMixinInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ current: '', accent: undefined, complementary: undefined }, params);
    // if (finalParams.current === 'current')
    //     throw new Error(
    //         `You cannot remap the "<yellow>current</yellow>" color to "<cyan>current</cyan>"...`,
    //     );
    // if (finalParams.accent === 'accent')
    //     throw new Error(
    //         `You cannot remap the "<yellow>accent</yellow>" color to "<cyan>accent</cyan>"...`,
    //     );
    // if (finalParams.complementary === 'complementary')
    //     throw new Error(
    //         `You cannot remap the "<yellow>complementary</yellow>" color to "<cyan>complementary</cyan>"...`,
    //     );
    const vars = new CssVars();
    vars.code(`@s.color.remap(current, ${finalParams.current})`);
    if (finalParams.accent) {
        vars.code(`@s.color.remap(accent, ${finalParams.accent});`);
    }
    if (finalParams.complementary) {
        vars.code(`@s.color.remap(complementary, ${finalParams.complementary});`);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ2lELDBEQUFTO0FBbUMzRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxFQUFFLEVBQ1gsTUFBTSxFQUFFLFNBQVMsRUFDakIsYUFBYSxFQUFFLFNBQVMsSUFDckIsTUFBTSxDQUNaLENBQUM7SUFFRix5Q0FBeUM7SUFDekMsdUJBQXVCO0lBQ3ZCLGdHQUFnRztJQUNoRyxTQUFTO0lBQ1QsdUNBQXVDO0lBQ3ZDLHVCQUF1QjtJQUN2Qiw4RkFBOEY7SUFDOUYsU0FBUztJQUNULHFEQUFxRDtJQUNyRCx1QkFBdUI7SUFDdkIsNEdBQTRHO0lBQzVHLFNBQVM7SUFFVCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRTdELElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztLQUMvRDtJQUNELElBQUksV0FBVyxDQUFDLGFBQWEsRUFBRTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUNMLGlDQUFpQyxXQUFXLENBQUMsYUFBYSxJQUFJLENBQ2pFLENBQUM7S0FDTDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE3Q0QsNEJBNkNDIn0=