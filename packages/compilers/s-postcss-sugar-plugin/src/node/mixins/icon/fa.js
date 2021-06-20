import __SInterface from '@coffeekraken/s-interface';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __parseHtml from '@coffeekraken/sugar/node/terminal/parseHtml';
import * as __fa from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
class postcssSugarPluginIconFaInterface extends __SInterface {
}
postcssSugarPluginIconFaInterface.definition = {
    icon: {
        type: 'String',
        required: true
    },
    style: {
        type: 'String',
        values: ['solid', 'regular', 'light', 'duotone', 'brands'],
        default: 'solid'
    }
};
export { postcssSugarPluginIconFaInterface as interface };
const _isFaInitialised = false;
export default function ({ params, atRule, replaceWith }) {
    var _a;
    const finalParams = Object.assign({ icon: '', style: 'solid' }, params);
    if (finalParams.style === 'fa')
        finalParams.style = 'fas';
    const prefixes = {
        solid: 'fas',
        regular: 'far',
        light: 'fal',
        duotone: 'fad',
        brand: 'fab'
    };
    const fontNames = {
        fas: 'Free',
        far: 'Free',
        fal: 'Free',
        fad: 'Free',
        fab: 'Brands'
    };
    // register icons if first call
    if (!_isFaInitialised) {
        __fa.library.add(fas, fab);
        atRule.root().append(`
      @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
    `);
    }
    const prefix = (_a = prefixes[finalParams.style]) !== null && _a !== void 0 ? _a : finalParams.style;
    const iconDef = __fa.findIconDefinition({
        prefix,
        // @ts-ignore
        iconName: finalParams.icon
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
        fab: 400
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
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUV4RSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLEtBQUssSUFBSSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFekQsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxRQUFRLENBQUM7UUFDdEQsT0FBTyxFQUFFLE9BQU87S0FDbkI7Q0FDSixDQUFDO0FBUUosT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBRS9CLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7O0lBQ0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxFQUFFLEVBQ1IsS0FBSyxFQUFFLE9BQU8sSUFDWCxNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJO1FBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFFMUQsTUFBTSxRQUFRLEdBQUc7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEtBQUs7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQTtJQUVELE1BQU0sU0FBUyxHQUFHO1FBQ2hCLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLFFBQVE7S0FDZCxDQUFBO0lBRUQsK0JBQStCO0lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztxQkFDSixjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO0tBQzNELENBQUMsQ0FBQztLQUNKO0lBRUQsTUFBTSxNQUFNLEdBQUcsTUFBQSxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxtQ0FBSSxXQUFXLENBQUMsS0FBSyxDQUFDO0lBRWhFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNwQyxNQUFNO1FBQ04sYUFBYTtRQUNiLFFBQVEsRUFBRSxXQUFXLENBQUMsSUFBSTtLQUM3QixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsMkVBQTJFLFdBQVcsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN0SSxPQUFPO0tBQ1I7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssT0FBTyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssS0FBSztRQUFFLFdBQVcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBRTdGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFVBQVUsR0FBRztRQUNmLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7S0FDWCxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzttQ0FPdUIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzttQkFDL0MsVUFBVSxDQUFDLE1BQU0sQ0FBQzs7O29CQUdqQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O0dBR2hDLENBQUMsQ0FBQTtJQUVGLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=