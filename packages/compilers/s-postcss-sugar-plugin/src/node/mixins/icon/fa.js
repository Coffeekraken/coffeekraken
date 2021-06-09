import __SInterface from '@coffeekraken/s-interface';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
    const finalParams = Object.assign({}, params);
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
        iconName: finalParams.icon
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUV4RSxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLEtBQUssSUFBSSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFekQsTUFBTSxpQ0FBa0MsU0FBUSxZQUFZOztBQUNuRCw0Q0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxRQUFRLENBQUM7UUFDdEQsT0FBTyxFQUFFLE9BQU87S0FDbkI7Q0FDSixDQUFDO0FBUUosT0FBTyxFQUFFLGlDQUFpQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFELElBQUksZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0FBRTdCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRztRQUNmLEtBQUssRUFBRSxLQUFLO1FBQ1osT0FBTyxFQUFFLEtBQUs7UUFDZCxLQUFLLEVBQUUsS0FBSztRQUNaLE9BQU8sRUFBRSxLQUFLO1FBQ2QsS0FBSyxFQUFFLEtBQUs7S0FDYixDQUFBO0lBRUQsK0JBQStCO0lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztxQkFDSixjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO0tBQzNELENBQUMsQ0FBQztLQUNKO0lBRUQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ3BDLE1BQU0sRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztRQUNuQyxRQUFRLEVBQUUsV0FBVyxDQUFDLElBQUk7S0FDN0IsQ0FBQyxDQUFDO0lBRUgsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sVUFBVSxHQUFHO1FBQ2YsSUFBSSxFQUFFLEdBQUc7UUFDVCxLQUFLLEVBQUUsR0FBRztRQUNWLE9BQU8sRUFBRSxHQUFHO1FBQ1osS0FBSyxFQUFFLEdBQUc7UUFDVixPQUFPLEVBQUUsR0FBRztRQUNaLE1BQU0sRUFBRSxHQUFHO0tBQ2QsQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxPQUFPO1FBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7SUFFOUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzttQ0FPdUIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7bUJBQy9DLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDOzs7O29CQUk1QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O0dBR2hDLENBQUMsQ0FBQTtJQUVGLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=