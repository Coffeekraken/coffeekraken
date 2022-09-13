import __SInterface from '@coffeekraken/s-interface';
import { __parseHtml } from '@coffeekraken/sugar/console';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __fab from './fa/brands';
import __fas from './fa/solid';
class postcssSugarPluginIconFaInterface extends __SInterface {
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
export { postcssSugarPluginIconFaInterface as interface };
export default function ({ params, atRule, replaceWith, sharedData, }) {
    var _a;
    const finalParams = Object.assign({ icon: '', style: 'fas' }, params);
    if (finalParams.style === 'fa')
        finalParams.style = 'fas';
    let availableIcons = {
        fas: __fas,
        fab: __fab,
    };
    const faId = __camelCase(`fa-${finalParams.icon}`);
    if (!((_a = availableIcons[finalParams.style]) === null || _a === void 0 ? void 0 : _a[faId])) {
        console.log(__parseHtml(`<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`));
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
    font-family: "Font Awesome 6 ${__upperFirst(fontNames[finalParams.style])}";
    font-weight: ${fontWeight[finalParams.style]};
    
    &:before {
      content: "\\${iconObj.icon[3]}";
      display: inline-block;
    }
  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxLQUFLLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sS0FBSyxNQUFNLFlBQVksQ0FBQztBQUUvQixNQUFNLGlDQUFrQyxTQUFRLFlBQVk7SUFDeEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztnQkFDakQsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBQ1gsVUFBVSxHQU1iOztJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxLQUFLLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssSUFBSTtRQUFFLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRTFELElBQUksY0FBYyxHQUFHO1FBQ2pCLEdBQUcsRUFBRSxLQUFLO1FBQ1YsR0FBRyxFQUFFLEtBQUs7S0FDYixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFbkQsSUFBSSxDQUFDLENBQUEsTUFBQSxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQywwQ0FBRyxJQUFJLENBQUMsQ0FBQSxFQUFFO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQ1AsV0FBVyxDQUNQLDJFQUEyRSxXQUFXLENBQUMsSUFBSSxnQkFBZ0IsQ0FDOUcsQ0FDSixDQUFDO1FBQ0YsT0FBTztLQUNWO0lBRUQsVUFBVSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztJQUV0QyxJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXRELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFNBQVMsR0FBRztRQUNWLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLFFBQVE7S0FDaEIsRUFDRCxVQUFVLEdBQUc7UUFDVCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO0tBQ1gsQ0FBQztJQUVOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7bUNBT3FCLFlBQVksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO21CQUMxRCxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzs7O29CQUc1QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O0dBR2hDLENBQUMsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==