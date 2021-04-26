"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginRatioInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginRatioInterface;
postcssSugarPluginRatioInterface.definition = {
    ratio: {
        type: 'Number',
        required: true,
        alias: 'd'
    }
};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ ratio: 1 }, params);
    const vars = [
        `
    position: relative;
    &::before {
        content: '';
        display: block;
        box-sizing: content-box;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% / ${finalParams.ratio});
    }Pindex.css
    & > *:not[class*="s-center-"] {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
    }
  `
    ];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYXRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFFckQsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTs7QUFjZCxxREFBUztBQWI3QywyQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVNKLG1CQUNFLFNBQWtELEVBQUUsRUFDcEQsTUFBTSxFQUNOLGFBQWE7SUFFYixNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLENBQUMsSUFDTCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ3JCOzs7Ozs7OzttQ0FRK0IsV0FBVyxDQUFDLEtBQUs7Ozs7Ozs7R0FPakQ7S0FDQSxDQUFDO0lBRUYsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUEvQkQsNEJBK0JDIn0=