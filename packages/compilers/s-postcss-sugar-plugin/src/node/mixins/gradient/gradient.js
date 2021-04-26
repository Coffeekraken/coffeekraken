"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginGradientInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginGradientInterface;
postcssSugarPluginGradientInterface.definition = {
    start: {
        type: 'String',
        required: true,
        alias: 's'
    },
    end: {
        type: 'String',
        required: true,
        alias: 'e'
    },
    type: {
        type: 'String',
        values: ['linear', 'radial'],
        default: 'linear'
    },
    angle: {
        type: 'Number | String',
        default: 0
    }
};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ start: 'primary--50', end: 'primary--70', type: 'linear', angle: 0 }, params);
    let startColorVar = `var(--s-gradient-start-color-inline, sugar.color(${finalParams.start}))`;
    let endColorVar = `var(--s-gradient-end-color-inline, sugar.color(${finalParams.end}))`;
    let angleVar = `var(--s-gradient-angle-inline, ${finalParams.angle}deg)`;
    let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    if (finalParams.type === 'radial') {
        gradientCss = `background: radial-gradient(circle, ${startColorVar} 0%, ${endColorVar} 100%);`;
    }
    const vars = [gradientCss];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFFckQsTUFBTSxtQ0FBb0MsU0FBUSxxQkFBWTs7QUErQmQsd0RBQVM7QUE5QmhELDhDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUM1QixPQUFPLEVBQUUsUUFBUTtLQUNsQjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsT0FBTyxFQUFFLENBQUM7S0FDWDtDQUNGLENBQUM7QUFZSixtQkFDRSxTQUFxRCxFQUFFLEVBQ3ZELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxhQUFhLEVBQ3BCLEdBQUcsRUFBRSxhQUFhLEVBQ2xCLElBQUksRUFBRSxRQUFRLEVBQ2QsS0FBSyxFQUFFLENBQUMsSUFDTCxNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksYUFBYSxHQUFHLG9EQUFvRCxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDOUYsSUFBSSxXQUFXLEdBQUcsa0RBQWtELFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN4RixJQUFJLFFBQVEsR0FBRyxrQ0FBa0MsV0FBVyxDQUFDLEtBQUssTUFBTSxDQUFDO0lBRXpFLElBQUksV0FBVyxHQUFHLCtCQUErQixRQUFRLEtBQUssYUFBYSxRQUFRLFdBQVcsU0FBUyxDQUFDO0lBQ3hHLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDakMsV0FBVyxHQUFHLHVDQUF1QyxhQUFhLFFBQVEsV0FBVyxTQUFTLENBQUM7S0FDaEc7SUFFRCxNQUFNLElBQUksR0FBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBMUJELDRCQTBCQyJ9