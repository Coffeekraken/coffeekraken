// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
/**
 * @name           classes
 * @namespace      node.mixins.gradient
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the gradient helper classes like s-gradient:accent, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.gradient.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginGradientClassesInterface extends __SInterface {
}
postcssSugarPluginGradientClassesInterface.definition = {
    types: {
        type: 'String[]',
        values: ['linear', 'radial'],
        default: ['linear', 'radial'],
        alias: 't',
    },
    angles: {
        type: 'Number[]',
        default: [0, 45, 90, 135, 180, 225, 270],
        alias: 'a',
    },
};
export { postcssSugarPluginGradientClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ types: ['linear', 'radial'], angles: [0, 45, 90, 135, 180, 225, 270] }, params);
    const vars = [];
    if (finalParams.types.indexOf('linear') !== -1) {
        vars.push(`/**
        * @name             s-gradient:linear
        * @namespace          sugar.css.gradient
        * @type                 CssClass
        * @platform         css
        * @status           beta
        *
        * This class allows you to apply a "<yellow>linear</yellow> gradient to any HTMLElement. Note that this will apply a linear gradient using the "<yellow>primary</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @example        html
        * <div class="s-gradient\:linear\:accent">
        *   Hello gradient
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    .s-gradient--linear {
        --s-gradient-type-inline: linear;
    }`);
    }
    if (finalParams.types.indexOf('radial') !== -1) {
        vars.push(`/**
        * @name             s-gradient:radial
        * @namespace          sugar.css.gradient
        * @type                 CssClass
        * @platform       css
        * @status         beta
        *
        * This class allows you to apply a "<yellow>radial</yellow> gradient to any HTMLElement. Note that this will apply a radial gradient using the "<yellow>primary</yellow>" color. If you want
        * apply something different, make use of the "<cyan>s-gradient-start-{colorName}</cyan>" and "<cyan>s-gradient-end-{colorName}</cyan>" classes...
        *
        * @example        html
        * <div class="s-gradient\:radial\:accent">
        *   Hello gradient
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    .s-gradient--radial {
        --s-gradient-type-inline: radial;
    }`);
    }
    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.push(`
        /**
         * @name        .s-gradient:${angle}deg
         * @namespace       sugar.css.gradient
         * @type            CssClass
         * @platform        css
         * @status          beta
         * 
         * This class allows you to apply an angle of "<magenta>${angle}</magenta>" you want if your gradient
         * is of type "<yellow>linear</yellow>" of course.
         * 
         * @example             html
         * <div class="s-ratio\:16-9 s-gradient\:linear\:${angle}deg\:start-primary-50\:end-primary-70">
         *     <div class="s-center-abs">I'm a cool depth button</div>
         * </div>
         * 
         * @since            2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-gradient--${angle}deg {
            --s-gradient-angle-inline: ${angle}deg;
        }
    `);
        });
    }
    let currentName;
    __theme().loopOnColors(({ name, variant, value }) => {
        if (currentName !== name) {
            // default gradients
            vars.push(`
          /**
           * @name        .s-gradient:${name}
           * @namespace   sugar.css.gradient
           * @type            CssClass
           * @platform        css
           * @status          beta
           *
           * This class allows you to apply directly a "<yellow>${name}</yellow>" gradient on any HTMLElement.
           * This gradient uses the "<yellow>gradient.defaultType</yellow>" and "<yellow>gradient.defaultAngle</yellow>" theme config.
           * If you want to apply some different gradient using classes, make use of the others available
           * classes like the "<yellow>s-gradient-type-{type}</yellow>", etc...
           *
           * @example         html
           * <div class="s-ratio\:16-9 s-gradient\:${name}">
           *     <div class="s-center-abs">I'm a cool depth button</div>
           * </div>
           *
           * @since       2.0.0
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
           */
          .s-gradient--${name} {
              @sugar.gradient(
                  $start: ${name},
                  $end: ${name}--${__theme().config('gradient.defaultVariant')},
                  $type: ${__theme().config('gradient.defaultType')},
                  $angle: ${__theme().config('gradient.defaultAngle')}
              );
          }
      `);
        }
        currentName = name;
        const startColorClassName = `s-gradient:start-${name}${variant === 'default' ? '' : `-${variant}`}`;
        vars.push(`/**
        * @name          ${startColorClassName}
        * @namespace          sugar.css.gradient
        * @type               CssClass
        * @platform           css
        * @status           beta
        *
        * This class allows you to apply a "<yellow>${name}</yellow>" gradient start color to any HTMLElement
        *
        * @example        html
        * <div class="s-ratio\:16-9 ${startColorClassName.replace(':', ':')}\:end-${name}${next.variant === 'default' ? '' : `-${next.variant}`}">
        *     <div class="s-center-abs">I'm a cool depth button</div>
        * </div>
        *
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      .${startColorClassName.replace(':', '--')} {
          --s-gradient-start-color-inline: sugar.color(${name}, ${variant});
      }`);
        const endColorClassName = `s-gradient:end-${name}${variant === 'default' ? '' : `-${variant}`}`;
        vars.push(`/**
      * @name          ${endColorClassName}
      * @namespace          sugar.css.gradient
      * @type               CssClass
      * @platform         css
      * @status           beta
      *
      * This class allows you to apply a "<yellow>${name}${variant === 'default' ? '' : `-${variant}`}</yellow>" gradient end color to any HTMLElement
      *
      * @example        html
      * <div class="s-ratio\:16-9 ${endColorClassName.replace(':', ':')}\:start-${name}${previous.variant === 'default' ? '' : `-${previous.variant}`} ${endColorClassName}">
      *     <div class="s-center-abs">I'm a cool depth button</div>
      * </div>
      *
      * @since            2.0.0
      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
    .${endColorClassName.replace(':', '--')} {
        --s-gradient-end-color-inline: sugar.color(${name}, ${variant});
    }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxVQUFVO1FBQ2hCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDNUIsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUM3QixLQUFLLEVBQUUsR0FBRztLQUNiO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFVBQVU7UUFDaEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3hDLEtBQUssRUFBRSxHQUFHO0tBQ2I7Q0FDSixDQUFDO0FBUU4sT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFDcEMsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQW9CWixDQUFDLENBQUM7S0FDSDtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFvQlosQ0FBQyxDQUFDO0tBQ0g7SUFFRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7UUFDcEIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDOztzQ0FFZ0IsS0FBSzs7Ozs7O2tFQU11QixLQUFLOzs7OzJEQUlaLEtBQUs7Ozs7Ozs7dUJBT3pDLEtBQUs7eUNBQ2EsS0FBSzs7S0FFekMsQ0FBQyxDQUFDO1FBQ0MsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksV0FBVyxDQUFDO0lBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1FBQ2hELElBQUksV0FBVyxLQUFLLElBQUksRUFBRTtZQUN0QixvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQzs7d0NBRWtCLElBQUk7Ozs7OztrRUFNc0IsSUFBSTs7Ozs7O3FEQU1qQixJQUFJOzs7Ozs7O3lCQU9oQyxJQUFJOzs0QkFFRCxJQUFJOzBCQUNOLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUM7MkJBQ25ELE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzs0QkFDdkMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDOzs7T0FHOUQsQ0FBQyxDQUFDO1NBQ0E7UUFDRCxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRW5CLE1BQU0sbUJBQW1CLEdBQUcsb0JBQW9CLElBQUksR0FBRyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxFQUFFLEVBQUUsQ0FBQztRQUNwRyxJQUFJLENBQUMsSUFBSSxDQUFDOzJCQUNTLG1CQUFtQjs7Ozs7O3NEQU1RLElBQUk7OztzQ0FHcEIsbUJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsU0FBUyxJQUFJLEdBQzVFLElBQUksQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFDdEQ7Ozs7Ozs7U0FPQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzt5REFDVSxJQUFJLEtBQUssT0FBTztRQUNqRSxDQUFDLENBQUM7UUFFRixNQUFNLGlCQUFpQixHQUFHLGtCQUFrQixJQUFJLEdBQUcsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sRUFBRSxFQUFFLENBQUM7UUFDaEcsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDTyxpQkFBaUI7Ozs7OztvREFNVSxJQUFJLEdBQzVDLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLEVBQzVDOzs7b0NBRzRCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUMxRSxRQUFRLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQzlELElBQUksaUJBQWlCOzs7Ozs7O09BT3RCLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO3FEQUNVLElBQUksS0FBSyxPQUFPO01BQy9ELENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==