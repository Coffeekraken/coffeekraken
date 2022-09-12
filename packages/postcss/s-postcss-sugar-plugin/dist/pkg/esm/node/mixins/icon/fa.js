import __SInterface from '@coffeekraken/s-interface';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __fab from './fa/brands';
import __fas from './fa/solid';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSxhQUFhLENBQUM7QUFDaEMsT0FBTyxLQUFLLE1BQU0sWUFBWSxDQUFDO0FBQy9CLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE1BQU0saUNBQWtDLFNBQVEsWUFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO2dCQUNqRCxPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsaUNBQWlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFMUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEdBTWI7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsS0FBSyxFQUFFLEtBQUssSUFDVCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJO1FBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFFMUQsSUFBSSxjQUFjLEdBQUc7UUFDakIsR0FBRyxFQUFFLEtBQUs7UUFDVixHQUFHLEVBQUUsS0FBSztLQUNiLENBQUM7SUFDRixNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUVuRCxJQUFJLENBQUMsQ0FBQSxNQUFBLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLDBDQUFHLElBQUksQ0FBQyxDQUFBLEVBQUU7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FDUCxXQUFXLENBQ1AsMkVBQTJFLFdBQVcsQ0FBQyxJQUFJLGdCQUFnQixDQUM5RyxDQUNKLENBQUM7UUFDRixPQUFPO0tBQ1Y7SUFFRCxVQUFVLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0lBRXRDLElBQUksT0FBTyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFdEQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sU0FBUyxHQUFHO1FBQ1YsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsUUFBUTtLQUNoQixFQUNELFVBQVUsR0FBRztRQUNULEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7S0FDWCxDQUFDO0lBRU4sSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzttQ0FPcUIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7bUJBQzFELFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDOzs7b0JBRzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7R0FHaEMsQ0FBQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9