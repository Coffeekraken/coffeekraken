import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import * as __fa from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
class postcssSugarPluginIconFaInterface extends __SInterface {
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
            icon: {
                type: 'String',
                required: true,
            },
            style: {
                type: 'String',
                values: ['solid', 'regular', 'light', 'duotone', 'brands'],
                default: 'solid',
            },
        }));
    }
}
export { postcssSugarPluginIconFaInterface as interface };
let _isFaInitialised = false;
export default function ({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ icon: '', style: 'solid' }, params);
    if (finalParams.style === 'fa')
        finalParams.style = 'fas';
    const prefixes = {
        solid: 'fas',
        regular: 'far',
        light: 'fal',
        duotone: 'fad',
        brand: 'fab',
    };
    const fontNames = {
        fas: 'Free',
        far: 'Free',
        fal: 'Free',
        fad: 'Free',
        fab: 'Brands',
    };
    // register icons if first call
    if (!_isFaInitialised) {
        __fa.library.add(fas, fab);
        atRule.root().append(`
      @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
    `);
        _isFaInitialised = true;
    }
    const prefix = (_a = prefixes[finalParams.style]) !== null && _a !== void 0 ? _a : finalParams.style;
    const iconDef = __fa.findIconDefinition({
        prefix,
        // @ts-ignore
        iconName: finalParams.icon,
    });
    if (!iconDef) {
        console.log(__parseHtml(`<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`));
        return;
    }
    if (finalParams.style === 'solid' || finalParams.style === 'fas')
        finalParams.style = 'free';
    const vars = [];
    const fontWeight = {
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
    font-family: "Font Awesome 5 ${__upperFirst(fontNames[prefix])}";
    font-weight: ${fontWeight[prefix]};
    
    &:before {
      content: "\\${iconDef.icon[3]}";
      display: inline-block;
    }
  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEtBQUssSUFBSSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEQsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZO0lBQ3hELE1BQU0sS0FBSyxVQUFVOztRQUNqQixPQUFPLENBQ0gsTUFBQSxJQUFJLENBQUMsTUFBTSxFQUFFLG1DQUNiLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDUCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztnQkFDMUQsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSxpQ0FBaUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUxRCxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUU3QixNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkOztJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxPQUFPLElBQ1gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssSUFBSTtRQUFFLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRTFELE1BQU0sUUFBUSxHQUFHO1FBQ2IsS0FBSyxFQUFFLEtBQUs7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxLQUFLO1FBQ1osT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsS0FBSztLQUNmLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRztRQUNkLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLFFBQVE7S0FDaEIsQ0FBQztJQUVGLCtCQUErQjtJQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7cUJBQ1IsY0FBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztLQUMzRCxDQUFDLENBQUM7UUFDQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7S0FDM0I7SUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFBLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLG1DQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFaEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3BDLE1BQU07UUFDTixhQUFhO1FBQ2IsUUFBUSxFQUFFLFdBQVcsQ0FBQyxJQUFJO0tBQzdCLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDVixPQUFPLENBQUMsR0FBRyxDQUNQLFdBQVcsQ0FDUCwyRUFBMkUsV0FBVyxDQUFDLElBQUksZ0JBQWdCLENBQzlHLENBQ0osQ0FBQztRQUNGLE9BQU87S0FDVjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxPQUFPLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxLQUFLO1FBQzVELFdBQVcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBRS9CLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFVBQVUsR0FBRztRQUNmLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7S0FDWCxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzttQ0FPcUIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzttQkFDL0MsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7O29CQUdqQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O0dBR2hDLENBQUMsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==