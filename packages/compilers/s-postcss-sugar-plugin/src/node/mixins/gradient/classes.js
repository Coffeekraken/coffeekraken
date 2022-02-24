// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.gradient
 * @type           PostcssMixin
 * @platform      postcss
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginGradientClassesInterface extends __SInterface {
    static get _definition() {
        return {
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
    }
}
export { postcssSugarPluginGradientClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ types: ['linear', 'radial'], angles: [0, 45, 90, 135, 180, 225, 270] }, params);
    const vars = new CssVars();
    if (finalParams.types.indexOf('linear') !== -1) {
        vars.comment(`/**
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
    .s-gradient--linear {
        --s-gradient-type-inline: linear;
    }`);
    }
    if (finalParams.types.indexOf('radial') !== -1) {
        vars.comment(`/**
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
    .s-gradient--radial {
        --s-gradient-type-inline: radial;
    }`);
    }
    if (finalParams.angles) {
        finalParams.angles.forEach((angle) => {
            vars.comment(`
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        `).code(`
        .s-gradient--${angle}deg {
            --s-gradient-angle-inline: ${angle}deg;
        }
    `);
        });
    }
    let currentName;
    __STheme.getTheme().loopOnColors(({ name, variant, value }) => {
        if (currentName !== name) {
            // default gradients
            vars.comment(`
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
           * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
           */
          `).code(`
          .s-gradient--${name} {
              @sugar.gradient(
                  $start: ${name},
                  $end: ${name}--${__STheme.config('gradient.defaultVariant')},
                  $type: ${__STheme.config('gradient.defaultType')},
                  $angle: ${__STheme.config('gradient.defaultAngle')}
              );
          }
      `);
        }
        currentName = name;
        const startColorClassName = `s-gradient:start-${name}${variant === 'default' ? '' : `-${variant}`}`;
        vars.comment(`/**
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
      .${startColorClassName.replace(':', '--')} {
          --s-gradient-start-color-inline: sugar.color(${name}, ${variant});
      }`);
        const endColorClassName = `s-gradient:end-${name}${variant === 'default' ? '' : `-${variant}`}`;
        vars.comment(`/**
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
      * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
      */
     `).code(`
    .${endColorClassName.replace(':', '--')} {
        --s-gradient-end-color-inline: sugar.color(${name}, ${variant});
    }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQzdCLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztnQkFDeEMsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFDcEMsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFB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