import __SInterface from '@coffeekraken/s-interface';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLEtBQUssTUFBTSxZQUFZLENBQUM7QUFDL0IsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7Z0JBQ2pELE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSxpQ0FBaUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUxRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsR0FNYjs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsRUFDUixLQUFLLEVBQUUsS0FBSyxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLElBQUk7UUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUUxRCxJQUFJLGNBQWMsR0FBRztRQUNqQixHQUFHLEVBQUUsS0FBSztRQUNWLEdBQUcsRUFBRSxLQUFLO0tBQ2IsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRW5ELElBQUksQ0FBQyxDQUFBLE1BQUEsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsMENBQUcsSUFBSSxDQUFDLENBQUEsRUFBRTtRQUM1QyxPQUFPLENBQUMsR0FBRyxDQUNQLFdBQVcsQ0FDUCwyRUFBMkUsV0FBVyxDQUFDLElBQUksZ0JBQWdCLENBQzlHLENBQ0osQ0FBQztRQUNGLE9BQU87S0FDVjtJQUVELFVBQVUsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7SUFFdEMsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV0RCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxTQUFTLEdBQUc7UUFDVixHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxRQUFRO0tBQ2hCLEVBQ0QsVUFBVSxHQUFHO1FBQ1QsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztLQUNYLENBQUM7SUFFTixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O21DQU9xQixZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzttQkFDMUQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7OztvQkFHNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztHQUdoQyxDQUFDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=