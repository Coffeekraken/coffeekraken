"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const console_1 = require("@coffeekraken/sugar/console");
const camelCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/camelCase"));
const string_1 = require("@coffeekraken/sugar/string");
const brands_1 = __importDefault(require("./fa/brands"));
const solid_1 = __importDefault(require("./fa/solid"));
class postcssSugarPluginIconFaInterface extends s_interface_1.default {
    static get _definition() {
        return {
            icon: {
                type: 'String',
                required: true,
            },
            style: {
                type: 'String',
                values: ['fa', 'fas', 'far', 'fab', 'fal', 'fad'],
                default: 'fas',
            },
        };
    }
}
exports.interface = postcssSugarPluginIconFaInterface;
function default_1({ params, atRule, replaceWith, sharedData, }) {
    var _a;
    const finalParams = Object.assign({ icon: '', style: 'fas' }, params);
    if (finalParams.style === 'fa')
        finalParams.style = 'fas';
    let availableIcons = {
        fas: solid_1.default,
        fab: brands_1.default,
    };
    const faId = (0, camelCase_1.default)(`fa-${finalParams.icon}`);
    if (!((_a = availableIcons[finalParams.style]) === null || _a === void 0 ? void 0 : _a[faId])) {
        console.log((0, console_1.__parseHtml)(`<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`));
        return;
    }
    sharedData.isFontawesomeNeeded = true;
    let iconObj = availableIcons[finalParams.style][faId];
    const vars = [];
    const fontNames = {
        fas: 'Free',
        far: 'Free',
        fal: 'Free',
        fad: 'Free',
        fab: 'Brands',
    }, fontWeight = {
        fas: 900,
        far: 400,
        fal: 300,
        fad: 900,
        fab: 400,
    };
    vars.push(`
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    font-family: "Font Awesome 6 ${(0, string_1.__upperFirst)(fontNames[finalParams.style])}";
    font-weight: ${fontWeight[finalParams.style]};
    
    &:before {
      content: "\\${iconObj.icon[3]}";
      display: inline-block;
    }
  `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx5REFBMEQ7QUFDMUQsNEZBQXNFO0FBQ3RFLHVEQUEwRDtBQUMxRCx5REFBZ0M7QUFDaEMsdURBQStCO0FBRS9CLE1BQU0saUNBQWtDLFNBQVEscUJBQVk7SUFDeEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztnQkFDakQsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTzZDLHNEQUFTO0FBRXZELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEdBTWI7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsS0FBSyxFQUFFLEtBQUssSUFDVCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJO1FBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFFMUQsSUFBSSxjQUFjLEdBQUc7UUFDakIsR0FBRyxFQUFFLGVBQUs7UUFDVixHQUFHLEVBQUUsZ0JBQUs7S0FDYixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFbkQsSUFBSSxDQUFDLENBQUEsTUFBQSxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQywwQ0FBRyxJQUFJLENBQUMsQ0FBQSxFQUFFO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBQSxxQkFBVyxFQUNQLDJFQUEyRSxXQUFXLENBQUMsSUFBSSxnQkFBZ0IsQ0FDOUcsQ0FDSixDQUFDO1FBQ0YsT0FBTztLQUNWO0lBRUQsVUFBVSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUV0QyxJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXRELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFNBQVMsR0FBRztRQUNWLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLFFBQVE7S0FDaEIsRUFDRCxVQUFVLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO0tBQ1gsQ0FBQztJQUVOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7bUNBT3FCLElBQUEscUJBQVksRUFBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO21CQUMxRCxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzs7O29CQUc1QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O0dBR2hDLENBQUMsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF4RUQsNEJBd0VDIn0=