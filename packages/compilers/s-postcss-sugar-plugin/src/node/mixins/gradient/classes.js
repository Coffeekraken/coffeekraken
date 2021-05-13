import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginGradientClassesInterface extends __SInterface {
}
postcssSugarPluginGradientClassesInterface.definition = {
    types: {
        type: 'String[]',
        values: ['linear', 'radial'],
        default: ['linear', 'radial'],
        alias: 't'
    },
    angles: {
        type: 'Number[]',
        default: [0, 45, 90, 135, 180, 225, 270],
        alias: 'a'
    }
};
export { postcssSugarPluginGradientClassesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ types: ['linear', 'radial'], angles: [0, 45, 90, 135, 180, 225, 270] }, params);
    const colorsObj = __theme().config('color');
    const vars = [];
    if (finalParams.types.indexOf('linear') !== -1) {
        vars.push(`/**
        * @name             s-gradient-type-linear
        * @namespace          sugar.css.gradient
        * @type                 CssClass
        *
        * This class allows you to apply a "<yellow>linear</yellow> gradient to any HTMLElement. Note that this will apply a linear gradient using the "<yellow>primary</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    .s-gradient-type-linear {
        --s-gradient-type-inline: linear;
    }`);
    }
    if (finalParams.types.indexOf('radial') !== -1) {
        vars.push(`/**
        * @name             s-gradient-type-radial
        * @namespace          sugar.css.gradient
        * @type                 CssClass
        *
        * This class allows you to apply a "<yellow>radial</yellow> gradient to any HTMLElement. Note that this will apply a radial gradient using the "<yellow>primary</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    .s-gradient-type-radial {
        --s-gradient-type-inline: radial;
    }`);
    }
    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.push(`
        /**
         * @name        .s-gradient-angle-${angle}
         * @namespace       sugar.css.gradient
         * @type            CssClass
         * 
         * This class allows you to apply an angle of "<magenta>${angle}</magenta>" you want if your gradient
         * is of type "<yellow>linear</yellow>" of course.
         * 
         * @example             html
         * <div class="s-ratio-16-9 s-gradient-linear s-gradient-start-primary-50 s-gradient-end-primary-70">
         *     <div class="s-center-abs">I'm a cool depth button</div>
         * </div>
         * 
         * @since            2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-gradient-angle-${angle} {
            --s-gradient-angle-inline: ${angle}deg;
        }
    `);
        });
    }
    let currentName;
    __theme().loopOnColors(({ name, modifier, value, previous, next }) => {
        if (currentName !== name) {
            // default gradients
            vars.push(`
          /**
           * @name        .s-gradient-${name}
           * @namespace   sugar.css.gradient
           * @type            CssClass
           *
           * This class allows you to apply directly a "<yellow>${name}</yellow>" gradient on any HTMLElement.
           * This gradient uses the "<yellow>gradient.defaultType</yellow>" and "<yellow>gradient.defaultAngle</yellow>" theme config.
           * If you want to apply some different gradient using classes, make use of the others available
           * classes like the "<yellow>s-gradient-type-{type}</yellow>", etc...
           *
           * @example         html
           * <div class="s-ratio-16-9 s-gradient-${name}">
           *     <div class="s-center-abs">I'm a cool depth button</div>
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
           */
          .s-gradient-${name} {
              @sugar.gradient(
                  $start: ${name},
                  $end: ${name}--${__theme().config('gradient.defaultModifier')},
                  $type: ${__theme().config('gradient.defaultType')},
                  $angle: ${__theme().config('gradient.defaultAngle')}
              );
          }
      `);
        }
        currentName = name;
        const startColorClassName = `s-gradient-start-${name}${modifier === 'default' ? '' : `-${modifier}`}`;
        vars.push(`/**
        * @name          .${startColorClassName}
        * @namespace          sugar.css.gradient
        * @type               CssClass
        *
        * This class allows you to apply a "<yellow>${name}</yellow>" gradient start color to any HTMLElement
        *
        * @example        html
        * <div class="s-ratio-16-9 s-gradient-linear ${startColorClassName} s-gradient-end-${name}${next.modifier === 'default' ? '' : `-${next.modifier}`}">
        *     <div class="s-center-abs">I'm a cool depth button</div>
        * </div>
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      .${startColorClassName} {
          --s-gradient-start-color-inline: sugar.color(${name}, ${modifier});
      }`);
        const endColorClassName = `s-gradient-end-${name}${modifier === 'default' ? '' : `-${modifier}`}`;
        vars.push(`/**
      * @name          .${endColorClassName}
      * @namespace          sugar.css.gradient
      * @type               CssClass
      *
      * This class allows you to apply a "<yellow>${name}${modifier === 'default' ? '' : `-${modifier}`}</yellow>" gradient end color to any HTMLElement
      *
      * @example        html
      * <div class="s-ratio-16-9 s-gradient-linear s-gradient-start-${name}${previous.modifier === 'default' ? '' : `-${previous.modifier}`} ${endColorClassName}">
      *     <div class="s-center-abs">I'm a cool depth button</div>
      * </div>
      *
      * @since            2.0.0
      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
    .${endColorClassName} {
        --s-gradient-end-color-inline: sugar.color(${name}, ${modifier});
    }`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUM1RCxxREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDNUIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUM3QixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFVBQVU7UUFDaEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3hDLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBUUosT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFDcEMsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtB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