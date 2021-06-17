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
let _isFaInitialised = false;
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ icon: '', style: 'solid' }, params);
    const prefixes = {
        solid: 'fas',
        regular: 'far',
        light: 'fal',
        duotone: 'fad',
        brand: 'fab'
    };
    // register icons if first call
    if (!_isFaInitialised) {
        __fa.library.add(fas, fab);
        atRule.root().append(`
      @import url('${__SSugarConfig.get('icons.fontawesome.url')}');
    `);
    }
    const iconDef = __fa.findIconDefinition({
        prefix: prefixes[finalParams.style],
        // @ts-ignore
        iconName: finalParams.icon
    });
    if (!iconDef) {
        console.log(__parseHtml(`<red>!!!</red> It seems that you don't have access to the icon "<yellow>${finalParams.icon}</<yellow>"...`));
        return;
    }
    const vars = [];
    const fontWeight = {
        free: 900,
        solid: 900,
        regular: 400,
        light: 300,
        duotone: 900,
        brands: 400
    };
    if (finalParams.style === 'solid')
        finalParams.style = 'free';
    vars.push(`
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    font-style: normal;
    font-variant: normal;
    text-rendering: auto;
    line-height: 1;
    font-family: "Font Awesome 5 ${__upperFirst(finalParams.style)}";
    font-weight: ${fontWeight[finalParams.style]};
    

    &:before {
      content: "\\${iconDef.icon[3]}";
      display: inline-block;
    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUV4RSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLEtBQUssSUFBSSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFekQsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxRQUFRLENBQUM7UUFDdEQsT0FBTyxFQUFFLE9BQU87S0FDbkI7Q0FDSixDQUFDO0FBUUosT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBRTdCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsSUFBSSxFQUFFLEVBQUUsRUFDUixLQUFLLEVBQUUsT0FBTyxJQUNYLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUc7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEtBQUs7UUFDWixPQUFPLEVBQUUsS0FBSztRQUNkLEtBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQTtJQUVELCtCQUErQjtJQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7cUJBQ0osY0FBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztLQUMzRCxDQUFDLENBQUM7S0FDSjtJQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUNwQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDbkMsYUFBYTtRQUNiLFFBQVEsRUFBRSxXQUFXLENBQUMsSUFBSTtLQUM3QixDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsMkVBQTJFLFdBQVcsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUN0SSxPQUFPO0tBQ1I7SUFFRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxVQUFVLEdBQUc7UUFDZixJQUFJLEVBQUUsR0FBRztRQUNULEtBQUssRUFBRSxHQUFHO1FBQ1YsT0FBTyxFQUFFLEdBQUc7UUFDWixLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxHQUFHO1FBQ1osTUFBTSxFQUFFLEdBQUc7S0FDZCxDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLE9BQU87UUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztJQUU5RCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O21DQU91QixZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQzttQkFDL0MsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7Ozs7b0JBSTVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7R0FHaEMsQ0FBQyxDQUFBO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==