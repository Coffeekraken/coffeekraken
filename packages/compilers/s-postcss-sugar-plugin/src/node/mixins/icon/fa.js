import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import * as __fa from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
class postcssSugarPluginIconFaInterface extends __SInterface {
}
postcssSugarPluginIconFaInterface.definition = {
    icon: {
        type: 'String',
        required: true,
    },
    style: {
        type: 'String',
        values: ['solid', 'regular', 'light', 'duotone', 'brands'],
        default: 'solid',
    },
};
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
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLEtBQUssSUFBSSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEQsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNqRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7UUFDMUQsT0FBTyxFQUFFLE9BQU87S0FDbkI7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBRTdCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsS0FBSyxFQUFFLE9BQU8sSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJO1FBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFFMUQsTUFBTSxRQUFRLEdBQUc7UUFDYixLQUFLLEVBQUUsS0FBSztRQUNaLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEtBQUs7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxLQUFLO0tBQ2YsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHO1FBQ2QsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLEdBQUcsRUFBRSxNQUFNO1FBQ1gsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsUUFBUTtLQUNoQixDQUFDO0lBRUYsK0JBQStCO0lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztxQkFDUixjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO0tBQzNELENBQUMsQ0FBQztRQUNDLGdCQUFnQixHQUFHLElBQUksQ0FBQztLQUMzQjtJQUVELE1BQU0sTUFBTSxHQUFHLE1BQUEsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsbUNBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztJQUVoRSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDcEMsTUFBTTtRQUNOLGFBQWE7UUFDYixRQUFRLEVBQUUsV0FBVyxDQUFDLElBQUk7S0FDN0IsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQ1AsV0FBVyxDQUNQLDJFQUEyRSxXQUFXLENBQUMsSUFBSSxnQkFBZ0IsQ0FDOUcsQ0FDSixDQUFDO1FBQ0YsT0FBTztLQUNWO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLE9BQU8sSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLEtBQUs7UUFDNUQsV0FBVyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFFL0IsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sVUFBVSxHQUFHO1FBQ2YsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztLQUNYLENBQUM7SUFFRixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O21DQU9xQixZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO21CQUMvQyxVQUFVLENBQUMsTUFBTSxDQUFDOzs7b0JBR2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7R0FHaEMsQ0FBQyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==